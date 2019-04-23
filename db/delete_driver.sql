delete from "user"
where user_id = $1;

select * from "user"
where is_dispatcher = false;