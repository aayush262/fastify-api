
create table users (
    id uuid primary key default gen_random_uuid(),
    first_name varchar(100) not null,
    middle_name varchar(100),
    last_name varchar(100),
    password varchar(100) not null,
    email varchar(100) not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    version uuid not null default gen_random_uuid()
)