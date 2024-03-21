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

 Date: 21/03/2024 22:40:08
*/


-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS "public"."customer";
CREATE TABLE "public"."customer" (
  "created_at" timestamptz(6) NOT NULL DEFAULT now(),
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "dob" timestamptz(6),
  "phone" text COLLATE "pg_catalog"."default",
  "email" text COLLATE "pg_catalog"."default",
  "level" int4,
  "image" text COLLATE "pg_catalog"."default",
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "address" text COLLATE "pg_catalog"."default",
  "ward" text COLLATE "pg_catalog"."default",
  "district" text COLLATE "pg_catalog"."default",
  "province" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."customer" OWNER TO "postgres";

-- ----------------------------
-- Records of customer
-- ----------------------------
BEGIN;
INSERT INTO "public"."customer" ("created_at", "name", "dob", "phone", "email", "level", "image", "id", "address", "ward", "district", "province") VALUES ('2024-02-25 10:59:27.711694+00', 'Sang Customer', '2024-02-04 15:59:35+00', '0356021521', 'lhsang21@clc.fitus.edu.vn', 0, 'https://img.freepik.com/free-vector/cute-boy-playing-game-sofa-with-headphone-cartoon-vector-icon-illustration-people-technology_138676-5483.jpg', 'a2eeac32-c835-4bd8-9191-66b50fd87af2', '55, Võ Văn Kiệt', 'Phường Cô Giang', 'Quận 1', 'Thành phố Hồ Chí Minh');
INSERT INTO "public"."customer" ("created_at", "name", "dob", "phone", "email", "level", "image", "id", "address", "ward", "district", "province") VALUES ('2024-02-25 09:27:49.832438+00', 'Sang Customer 2', '2024-02-05 15:59:39+00', '0356021522', 'hoangsang6403@gmail.com', 45, 'https://img.freepik.com/free-vector/cute-boy-playing-game-sofa-with-headphone-cartoon-vector-icon-illustration-people-technology_138676-5483.jpg', 'ab116967-0ca4-487e-a8b5-4fd1bde910f8', '2, Nguyễn Văn Cừ', 'Phường Cầu Kho', 'Quận 1', 'Thành phố Hồ Chí Minh');
COMMIT;

-- ----------------------------
-- Primary Key structure for table customer
-- ----------------------------
ALTER TABLE "public"."customer" ADD CONSTRAINT "customer_pkey" PRIMARY KEY ("name", "id");
