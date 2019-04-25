update "inventory"
set item_name = $2, item_count = $3, item_specs = $4
where item_id = $1;

select * from "inventory"
order by item_id asc;