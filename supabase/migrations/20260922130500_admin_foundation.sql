begin;

create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

create type public.app_role as enum (
  'owner',
  'developer',
  'sales',
  'content',
  'finance',
  'read_only'
);

create type public.inquiry_status as enum (
  'new',
  'contacted',
  'qualified',
  'converted',
  'archived'
);

create type public.opportunity_stage as enum (
  'new_inquiry',
  'contacted',
  'discovery',
  'qualified',
  'proposal',
  'negotiation',
  'closed_won',
  'closed_lost'
);

create type public.activity_type as enum (
  'note',
  'email',
  'call',
  'meeting',
  'follow_up',
  'system'
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role public.app_role not null default 'read_only',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organizations (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 200),
  website text,
  industry text,
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contacts (
  id bigint generated always as identity primary key,
  organization_id bigint references public.organizations(id) on delete set null,
  full_name text not null check (char_length(full_name) between 1 and 200),
  email text,
  phone text,
  title text,
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint contacts_email_format check (
    email is null or email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  )
);

create table public.inquiries (
  id bigint generated always as identity primary key,
  contact_id bigint references public.contacts(id) on delete set null,
  name text not null check (char_length(name) between 1 and 200),
  email text not null check (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
  organization_name text check (organization_name is null or char_length(organization_name) <= 200),
  phone text check (phone is null or char_length(phone) <= 50),
  requested_service text check (requested_service is null or char_length(requested_service) <= 200),
  message text not null check (char_length(message) between 1 and 5000),
  source text not null default 'website' check (char_length(source) <= 100),
  status public.inquiry_status not null default 'new',
  assigned_to uuid references public.profiles(id) on delete set null,
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.opportunities (
  id bigint generated always as identity primary key,
  organization_id bigint references public.organizations(id) on delete set null,
  primary_contact_id bigint references public.contacts(id) on delete set null,
  inquiry_id bigint references public.inquiries(id) on delete set null,
  title text not null check (char_length(title) between 1 and 250),
  service_interest text,
  stage public.opportunity_stage not null default 'new_inquiry',
  estimated_value numeric(14,2) check (estimated_value is null or estimated_value >= 0),
  probability smallint check (probability is null or probability between 0 and 100),
  expected_close_date date,
  next_follow_up_at timestamptz,
  assigned_to uuid references public.profiles(id) on delete set null,
  lost_reason text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.pipeline_events (
  id bigint generated always as identity primary key,
  opportunity_id bigint not null references public.opportunities(id) on delete cascade,
  from_stage public.opportunity_stage,
  to_stage public.opportunity_stage not null,
  note text,
  changed_by uuid references public.profiles(id) on delete set null,
  changed_at timestamptz not null default now()
);

create table public.activities (
  id bigint generated always as identity primary key,
  opportunity_id bigint references public.opportunities(id) on delete cascade,
  contact_id bigint references public.contacts(id) on delete cascade,
  inquiry_id bigint references public.inquiries(id) on delete cascade,
  activity_type public.activity_type not null,
  subject text check (subject is null or char_length(subject) <= 250),
  body text,
  occurred_at timestamptz not null default now(),
  follow_up_at timestamptz,
  completed_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  constraint activities_parent_required check (
    num_nonnulls(opportunity_id, contact_id, inquiry_id) >= 1
  )
);

create table public.audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null check (char_length(action) between 1 and 100),
  entity_type text not null check (char_length(entity_type) between 1 and 100),
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index contacts_organization_id_idx on public.contacts (organization_id);
create index contacts_email_idx on public.contacts (lower(email)) where email is not null;
create index inquiries_contact_id_idx on public.inquiries (contact_id);
create index inquiries_status_submitted_at_idx on public.inquiries (status, submitted_at desc);
create index inquiries_assigned_to_idx on public.inquiries (assigned_to);
create index opportunities_organization_id_idx on public.opportunities (organization_id);
create index opportunities_primary_contact_id_idx on public.opportunities (primary_contact_id);
create index opportunities_inquiry_id_idx on public.opportunities (inquiry_id);
create index opportunities_stage_created_at_idx on public.opportunities (stage, created_at desc);
create index opportunities_assigned_to_idx on public.opportunities (assigned_to);
create index pipeline_events_opportunity_changed_at_idx on public.pipeline_events (opportunity_id, changed_at desc);
create index activities_opportunity_id_idx on public.activities (opportunity_id);
create index activities_contact_id_idx on public.activities (contact_id);
create index activities_inquiry_id_idx on public.activities (inquiry_id);
create index activities_follow_up_at_idx on public.activities (follow_up_at) where completed_at is null;
create index audit_log_actor_id_idx on public.audit_log (actor_id);
create index audit_log_entity_idx on public.audit_log (entity_type, entity_id, created_at desc);

create or replace function private.is_active_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select (select auth.uid()) is not null
    and exists (
      select 1
      from public.profiles
      where id = (select auth.uid())
        and is_active = true
    );
$$;

revoke all on function private.is_active_staff() from public, anon;
grant execute on function private.is_active_staff() to authenticated;

create or replace function private.can_manage_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select (select auth.uid()) is not null
    and exists (
      select 1
      from public.profiles
      where id = (select auth.uid())
        and is_active = true
        and role in ('owner', 'developer')
    );
$$;

revoke all on function private.can_manage_staff() from public, anon;
grant execute on function private.can_manage_staff() to authenticated;

create or replace function private.touch_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function private.touch_updated_at() from public, anon, authenticated;

create trigger profiles_touch_updated_at before update on public.profiles
for each row execute function private.touch_updated_at();
create trigger organizations_touch_updated_at before update on public.organizations
for each row execute function private.touch_updated_at();
create trigger contacts_touch_updated_at before update on public.contacts
for each row execute function private.touch_updated_at();
create trigger inquiries_touch_updated_at before update on public.inquiries
for each row execute function private.touch_updated_at();
create trigger opportunities_touch_updated_at before update on public.opportunities
for each row execute function private.touch_updated_at();

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.contacts enable row level security;
alter table public.inquiries enable row level security;
alter table public.opportunities enable row level security;
alter table public.pipeline_events enable row level security;
alter table public.activities enable row level security;
alter table public.audit_log enable row level security;

revoke all on all tables in schema public from anon, authenticated;
grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.organizations to authenticated;
grant select, insert, update, delete on public.contacts to authenticated;
grant select, insert, update, delete on public.inquiries to authenticated;
grant select, insert, update, delete on public.opportunities to authenticated;
grant select, insert, update, delete on public.pipeline_events to authenticated;
grant select, insert, update, delete on public.activities to authenticated;
grant select, insert on public.audit_log to authenticated;
grant usage, select on all sequences in schema public to authenticated;

grant insert (name, email, organization_name, phone, requested_service, message, source)
on public.inquiries to anon;
grant usage, select on sequence public.inquiries_id_seq to anon;

create policy profiles_read_self_or_manager on public.profiles
for select to authenticated
using (id = (select auth.uid()) or (select private.can_manage_staff()));

create policy profiles_manage_by_owner_or_developer on public.profiles
for all to authenticated
using ((select private.can_manage_staff()))
with check ((select private.can_manage_staff()));

create policy organizations_staff_access on public.organizations
for all to authenticated
using ((select private.is_active_staff()))
with check ((select private.is_active_staff()));

create policy contacts_staff_access on public.contacts
for all to authenticated
using ((select private.is_active_staff()))
with check ((select private.is_active_staff()));

create policy inquiries_public_submit on public.inquiries
for insert to anon
with check (
  status = 'new'
  and assigned_to is null
  and contact_id is null
  and source = 'website'
);

create policy inquiries_staff_access on public.inquiries
for all to authenticated
using ((select private.is_active_staff()))
with check ((select private.is_active_staff()));

create policy opportunities_staff_access on public.opportunities
for all to authenticated
using ((select private.is_active_staff()))
with check ((select private.is_active_staff()));

create policy pipeline_events_staff_access on public.pipeline_events
for all to authenticated
using ((select private.is_active_staff()))
with check ((select private.is_active_staff()));

create policy activities_staff_access on public.activities
for all to authenticated
using ((select private.is_active_staff()))
with check ((select private.is_active_staff()));

create policy audit_log_staff_read on public.audit_log
for select to authenticated
using ((select private.is_active_staff()));

create policy audit_log_staff_insert on public.audit_log
for insert to authenticated
with check (
  (select private.is_active_staff())
  and actor_id = (select auth.uid())
);

comment on table public.pipeline_events is 'Append-only history of opportunity stage transitions.';
comment on table public.audit_log is 'Append-only administrative activity log.';

commit;
