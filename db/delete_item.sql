delete from "inventory"
where item_id = $1;

select * from "inventory";