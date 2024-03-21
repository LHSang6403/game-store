/*
 THIS IS FOR AUTH.USERS

 Navicat Premium Data Transfer

 Source Server         : pg
 Source Server Type    : PostgreSQL
 Source Server Version : 150001 (150001)
 Source Host           : aws-0-ap-southeast-1.pooler.supabase.com:5432
 Source Catalog        : postgres
 Source Schema         : auth

 Target Server Type    : PostgreSQL
 Target Server Version : 150001 (150001)
 File Encoding         : 65001

 Date: 21/03/2024 22:42:11
*/


-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "auth"."users";
CREATE TABLE "auth"."users" (
  "instance_id" uuid,
  "id" uuid NOT NULL,
  "aud" varchar(255) COLLATE "pg_catalog"."default",
  "role" varchar(255) COLLATE "pg_catalog"."default",
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "encrypted_password" varchar(255) COLLATE "pg_catalog"."default",
  "email_confirmed_at" timestamptz(6),
  "invited_at" timestamptz(6),
  "confirmation_token" varchar(255) COLLATE "pg_catalog"."default",
  "confirmation_sent_at" timestamptz(6),
  "recovery_token" varchar(255) COLLATE "pg_catalog"."default",
  "recovery_sent_at" timestamptz(6),
  "email_change_token_new" varchar(255) COLLATE "pg_catalog"."default",
  "email_change" varchar(255) COLLATE "pg_catalog"."default",
  "email_change_sent_at" timestamptz(6),
  "last_sign_in_at" timestamptz(6),
  "raw_app_meta_data" jsonb,
  "raw_user_meta_data" jsonb,
  "is_super_admin" bool,
  "created_at" timestamptz(6),
  "updated_at" timestamptz(6),
  "phone" text COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "phone_confirmed_at" timestamptz(6),
  "phone_change" text COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "phone_change_token" varchar(255) COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "phone_change_sent_at" timestamptz(6),
  "confirmed_at" timestamptz(6) GENERATED ALWAYS AS (
LEAST(email_confirmed_at, phone_confirmed_at)
) STORED,
  "email_change_token_current" varchar(255) COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "email_change_confirm_status" int2 DEFAULT 0,
  "banned_until" timestamptz(6),
  "reauthentication_token" varchar(255) COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "reauthentication_sent_at" timestamptz(6),
  "is_sso_user" bool NOT NULL DEFAULT false,
  "deleted_at" timestamptz(6),
  "is_anonymous" bool NOT NULL DEFAULT false
)
;
ALTER TABLE "auth"."users" OWNER TO "supabase_auth_admin";
COMMENT ON COLUMN "auth"."users"."is_sso_user" IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';
COMMENT ON TABLE "auth"."users" IS 'Auth: Stores user login data within a secure schema.';

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES ('00000000-0000-0000-0000-000000000000', 'a2eeac32-c835-4bd8-9191-66b50fd87af2', 'authenticated', 'authenticated', 'lhsang21@clc.fitus.edu.vn', '$2a$10$xhGejUDiqPvQgFBQ0HQZn.sDVMg7ntupIxEDx8NF4MHvlq0.vz1YO', '2024-02-25 10:59:53.984294+00', NULL, '', '2024-02-25 10:59:23.831235+00', '', NULL, '', '', NULL, '2024-03-05 07:08:51.482678+00', '{"provider": "email", "providers": ["email"]}', '{"name": "Sang Customer", "role": "Customer", "phone": "0356021521"}', NULL, '2024-02-25 10:59:23.826287+00', '2024-03-07 02:03:59.569504+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, 'f', NULL, 'f');
INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES ('00000000-0000-0000-0000-000000000000', 'ab116967-0ca4-487e-a8b5-4fd1bde910f8', 'authenticated', 'authenticated', 'hoangsang6403@gmail.com', '$2a$10$.mXwa2WGHYHnRxHJUSmvROWlnrLP0Ibxgq2iS6S59if6tUXOzwkk.', '2024-02-25 09:28:04.191344+00', NULL, '', '2024-02-25 09:27:46.001173+00', '', NULL, '', '', NULL, '2024-03-20 09:19:38.110731+00', '{"provider": "email", "providers": ["email"]}', '{"name": "Sang Customer 2", "role": "customer", "phone": "0356021521"}', NULL, '2024-02-25 09:27:45.99625+00', '2024-03-20 09:19:38.114799+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, 'f', NULL, 'f');
INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES ('00000000-0000-0000-0000-000000000000', 'eea6ee9f-ce48-4d45-8020-2b0309824ae4', 'authenticated', 'authenticated', 'vatvo469@gmail.com', '$2a$10$KBV1wIF9Ax51u9PaJscO5uKFVebFtGd.D6q/AST.dGAz0m2rCv8hS', '2024-03-07 07:20:41.701313+00', NULL, '', '2024-03-07 07:19:15.64343+00', '', NULL, '', '', NULL, '2024-03-21 08:38:19.459717+00', '{"provider": "email", "providers": ["email"]}', '{"name": "Lê Hoàng Sang", "role": "Writer", "phone": "0356021521"}', NULL, '2024-03-07 07:19:15.637722+00', '2024-03-21 08:38:19.465118+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, 'f', NULL, 'f');
COMMIT;

-- ----------------------------
-- Indexes structure for table users
-- ----------------------------
CREATE UNIQUE INDEX "confirmation_token_idx" ON "auth"."users" USING btree (
  "confirmation_token" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
) WHERE confirmation_token::text !~ '^[0-9 ]*$'::text;
CREATE UNIQUE INDEX "email_change_token_current_idx" ON "auth"."users" USING btree (
  "email_change_token_current" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
) WHERE email_change_token_current::text !~ '^[0-9 ]*$'::text;
CREATE UNIQUE INDEX "email_change_token_new_idx" ON "auth"."users" USING btree (
  "email_change_token_new" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
) WHERE email_change_token_new::text !~ '^[0-9 ]*$'::text;
CREATE UNIQUE INDEX "reauthentication_token_idx" ON "auth"."users" USING btree (
  "reauthentication_token" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
) WHERE reauthentication_token::text !~ '^[0-9 ]*$'::text;
CREATE UNIQUE INDEX "recovery_token_idx" ON "auth"."users" USING btree (
  "recovery_token" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
) WHERE recovery_token::text !~ '^[0-9 ]*$'::text;
CREATE UNIQUE INDEX "users_email_partial_key" ON "auth"."users" USING btree (
  "email" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
) WHERE is_sso_user = false;
COMMENT ON INDEX "auth"."users_email_partial_key" IS 'Auth: A partial unique index that applies only when is_sso_user is false';
CREATE INDEX "users_instance_id_email_idx" ON "auth"."users" USING btree (
  "instance_id" "pg_catalog"."uuid_ops" ASC NULLS LAST,
  lower(email::text) COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "users_instance_id_idx" ON "auth"."users" USING btree (
  "instance_id" "pg_catalog"."uuid_ops" ASC NULLS LAST
);
CREATE INDEX "users_is_anonymous_idx" ON "auth"."users" USING btree (
  "is_anonymous" "pg_catalog"."bool_ops" ASC NULLS LAST
);

-- ----------------------------
-- Uniques structure for table users
-- ----------------------------
ALTER TABLE "auth"."users" ADD CONSTRAINT "users_phone_key" UNIQUE ("phone");

-- ----------------------------
-- Checks structure for table users
-- ----------------------------
ALTER TABLE "auth"."users" ADD CONSTRAINT "users_email_change_confirm_status_check" CHECK (email_change_confirm_status >= 0 AND email_change_confirm_status <= 2);

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "auth"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
