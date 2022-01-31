/* Replace with your SQL commands */

create table test (
    id uuid primary key default gen_random_uuid(),
    title text not null
)