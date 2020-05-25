CREATE TABLE "server_users" (
  "server_user_id" SERIAL PRIMARY KEY,
  "user_id" int,
  "server_id" int
);

CREATE TABLE "servers" (
  "server_id" SERIAL PRIMARY KEY,
  "server_name" varchar(50),
  "admin_id" int,
  "server_img" text
);

CREATE TABLE "categories" (
  "category_id" SERIAL PRIMARY KEY,
  "category_name" varchar(50),
  "server_id" int
);

CREATE TABLE "channels" (
  "channel_id" SERIAL PRIMARY KEY,
  "channel_name" varchar(50),
  "category_id" int
);

CREATE TABLE "server_admins" (
  "server_admin_id" SERIAL PRIMARY KEY,
  "user_id" int,
  "server_id" int
);

CREATE TABLE "direct_messages" (
  "dm_id" SERIAL PRIMARY KEY,
  "user_id" int,
  "dmg_id" int,
  "message" text
);

CREATE TABLE "direct_message_groups" (
  "dmg_id" SERIAL PRIMARY KEY,
  "dmg_name" varchar(100)
);

CREATE TABLE "direct_messages_users" (
  "dmu_id" SERIAL PRIMARY KEY,
  "dmg_id" int,
  "user_id" int
);

CREATE TABLE "users" (
  "user_id" SERIAL PRIMARY KEY,
  "user_name" varchar(50),
  "created_at" timestamp,
  "user_uuid" varchar(200),
  "email" varchar(200),
  "profile_pic" text
);

CREATE TABLE "post_replies" (
  "p_reply_id" SERIAL PRIMARY KEY,
  "user_id" int,
  "post_id" int,
  "reply" text,
  "reply_img" varchar(400),
  "time" timestamp
);

CREATE TABLE "posts" (
  "post_id" SERIAL PRIMARY KEY,
  "user_id" int,
  "channel_id" int,
  "post" text,
  "post_img" varchar(400),
  "time" timestamp
);

ALTER TABLE "server_users" ADD FOREIGN KEY ("server_id") REFERENCES "servers" ("server_id");

ALTER TABLE "server_admins" ADD FOREIGN KEY ("server_id") REFERENCES "servers" ("server_id");

ALTER TABLE "categories" ADD FOREIGN KEY ("server_id") REFERENCES "servers" ("server_id");

ALTER TABLE "servers" ADD FOREIGN KEY ("admin_id") REFERENCES "users" ("user_id");

ALTER TABLE "post_replies" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "server_admins" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "server_users" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "direct_messages" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "direct_messages_users" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "posts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "posts" ADD FOREIGN KEY ("channel_id") REFERENCES "channels" ("channel_id");

ALTER TABLE "channels" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("category_id");

ALTER TABLE "post_replies" ADD FOREIGN KEY ("post_id") REFERENCES "posts" ("post_id");

ALTER TABLE "direct_messages_users" ADD FOREIGN KEY ("dmg_id") REFERENCES "direct_message_groups" ("dmg_id");

ALTER TABLE "direct_messages" ADD FOREIGN KEY ("dmg_id") REFERENCES "direct_message_groups" ("dmg_id");
