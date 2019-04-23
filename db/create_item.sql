insert into "inventory" (item_name, item_count, item_specs, item_img)
values ($1, $2, $3, $4)
returning item_name, item_count, item_specs, item_img