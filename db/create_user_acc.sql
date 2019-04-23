insert into "user" (last_name, user_handle, user_phone, user_hash, is_dispatcher)
values ($1, $2, $3, $4, $5)
returning user_handle, user_id, is_dispatcher, user_phone