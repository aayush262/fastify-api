create table jobs (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    description text not null,
    skills text not null,
    min_budget varchar(20) not null,
    max_budget varchar(20) not null,
    expires_at date not null default current_date,
    user_id uuid not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    version uuid not null default gen_random_uuid(),
    CONSTRAINT fk_user
      FOREIGN KEY (user_id) 
	  REFERENCES users(id)
)