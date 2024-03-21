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

 Date: 21/03/2024 22:39:53
*/


-- ----------------------------
-- Table structure for blog
-- ----------------------------
DROP TABLE IF EXISTS "public"."blog";
CREATE TABLE "public"."blog" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "created_at" timestamptz(6) NOT NULL DEFAULT now(),
  "title" text COLLATE "pg_catalog"."default",
  "description" text COLLATE "pg_catalog"."default",
  "content" text COLLATE "pg_catalog"."default",
  "images" text[] COLLATE "pg_catalog"."default",
  "writer" uuid DEFAULT gen_random_uuid(),
  "likes" int4,
  "comments" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."blog" OWNER TO "postgres";

-- ----------------------------
-- Records of blog
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Primary Key structure for table blog
-- ----------------------------
ALTER TABLE "public"."blog" ADD CONSTRAINT "blog_pkey" PRIMARY KEY ("id");
