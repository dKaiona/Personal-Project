select order_id, item_name as Item, item_count, first_name as FirstName, "Last_name" as LastName, cust_phone as Phone, "cust_Address" as Address, user_handle as driver
from "orders"
join "inventory" on "orders".item_id = "inventory".item_id
join "customer" on "orders".cust_id = "customer".cust_id
join "user" on "orders".user_id = "user".user_id
order by order_id asc;