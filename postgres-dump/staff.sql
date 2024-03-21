/*
 Navicat Premium Data Transfer

 Source Server         : pg
 Source Server Type    : PostgreSQL
 Source Server Version : 150001 (150001)
 Source Host           : aws-0-ap-southeast-1.pooler.supabase.com:5432
 Source Catalog        : postgres
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 150001 (150001)
 File Encoding         : 65001

 Date: 21/03/2024 22:41:03
*/


-- ----------------------------
-- Table structure for staff
-- ----------------------------
DROP TABLE IF EXISTS "public"."staff";
CREATE TABLE "public"."staff" (
  "created_at" timestamptz(6) NOT NULL DEFAULT now(),
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "dob" timestamptz(6),
  "phone" text COLLATE "pg_catalog"."default",
  "email" text COLLATE "pg_catalog"."default",
  "image" text COLLATE "pg_catalog"."default",
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "role" text COLLATE "pg_catalog"."default" DEFAULT ''::text,
  "address" text COLLATE "pg_catalog"."default",
  "ward" text COLLATE "pg_catalog"."default",
  "province" text COLLATE "pg_catalog"."default",
  "district" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."staff" OWNER TO "postgres";

-- ----------------------------
-- Records of staff
-- ----------------------------
BEGIN;
INSERT INTO "public"."staff" ("created_at", "name", "dob", "phone", "email", "image", "id", "role", "address", "ward", "province", "district") VALUES ('2024-02-26 06:38:22.318212+00', 'test 2', '2024-02-01 07:51:14+00', '5647676746', 'test2@gmail.com', NULL, '5e5f8717-d5c5-4e4b-9ae2-e0a2eeb73ff1', 'Writer', 'Singapore', NULL, NULL, NULL);
INSERT INTO "public"."staff" ("created_at", "name", "dob", "phone", "email", "image", "id", "role", "address", "ward", "province", "district") VALUES ('2024-02-26 03:19:44.811808+00', 'test staff 1', '2024-02-09 03:19:30+00', '0324567832', 'gmail@gmail.com', NULL, 'ed207ca1-37c3-4d83-9d25-5bdc2af857b7', 'Seller', 'HCM', NULL, NULL, NULL);
INSERT INTO "public"."staff" ("created_at", "name", "dob", "phone", "email", "image", "id", "role", "address", "ward", "province", "district") VALUES ('2024-03-07 07:19:19.188194+00', 'Lê Hoàng Sang', '2000-03-31 17:00:00+00', '0356021521', 'vatvo469@gmail.com', 'https://img.freepik.com/free-vector/cute-boy-playing-game-sofa-with-headphone-cartoon-vector-icon-illustration-people-technology_138676-5483.jpg', 'eea6ee9f-ce48-4d45-8020-2b0309824ae4', 'Manager', '21, D4', 'Phường Trà An', 'Thành phố Cần Thơ', 'Quận Bình Thuỷ');
COMMIT;

-- ----------------------------
-- Primary Key structure for table staff
-- ----------------------------
ALTER TABLE "public"."staff" ADD CONSTRAINT "staff_pkey" PRIMARY KEY ("name", "id");
