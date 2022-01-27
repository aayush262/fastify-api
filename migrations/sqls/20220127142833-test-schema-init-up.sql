/* Replace with your SQL commands */

create table test (
    id uuid primary key default value gen_random_uuid(),
    title text not null
)