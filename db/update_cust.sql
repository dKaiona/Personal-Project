update "customer"
set first_name = $2, "Last_name" = $3, cust_email = $4, cust_phone = $5, "cust_Address" = $6
where cust_id = $1;

select * from "customer";