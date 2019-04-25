  CREATE TABLE "user" (
	"user_id" serial NOT NULL,
	"last_name" varchar(20),
	"user_handle" varchar(20) UNIQUE,
	"user_phone" varchar(20),
	"user_hash" varchar(250) NOT NULL,
	"is_dispatcher" boolean default false,
	CONSTRAINT user_pk PRIMARY KEY ("user_id") 
) WITH (
  OIDS=FALSE
);



CREATE TABLE "inventory" (
	"item_id" serial NOT NULL,
	"item_name" varchar(50) UNIQUE,
	"item_count" integer,
	"item_specs" varchar(100),
	"item_img" TEXT,
	CONSTRAINT inventory_pk PRIMARY KEY ("item_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "orders" (
	"order_id" serial NOT NULL,
	"item_id" integer NOT NULL,
	"cust_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT orders_pk PRIMARY KEY ("order_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "customer" (
	"cust_id" serial NOT NULL,
	"first_name" varchar(20),
	"Last_name" varchar(20),
	"cust_email" varchar(60),
	"cust_phone" varchar(20),
	"cust_Address" varchar(100) NOT NULL,
	CONSTRAINT customer_pk PRIMARY KEY ("cust_id")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "orders" ADD CONSTRAINT "orders_fk0" FOREIGN KEY ("item_id") REFERENCES "inventory"("item_id");
ALTER TABLE "orders" ADD CONSTRAINT "orders_fk1" FOREIGN KEY ("cust_id") REFERENCES "customer"("cust_id");
ALTER TABLE "orders" ADD CONSTRAINT "orders_fk2" FOREIGN KEY ("user_id") REFERENCES "user"("user_id");



