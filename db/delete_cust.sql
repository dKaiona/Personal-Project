delete from "customer"
where cust_id = $1;

select * from "customer";