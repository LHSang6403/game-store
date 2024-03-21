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

 Date: 21/03/2024 22:41:15
*/


-- ----------------------------
-- Table structure for storage
-- ----------------------------
DROP TABLE IF EXISTS "public"."storage";
CREATE TABLE "public"."storage" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "created_at" timestamptz(6) NOT NULL DEFAULT now(),
  "address" text COLLATE "pg_catalog"."default",
  "prod_id" uuid,
  "prod_name" text COLLATE "pg_catalog"."default",
  "quantity" int4
)
;
ALTER TABLE "public"."storage" OWNER TO "postgres";

-- ----------------------------
-- Records of storage
-- ----------------------------
BEGIN;
INSERT INTO "public"."storage" ("id", "created_at", "address", "prod_id", "prod_name", "quantity") VALUES ('988e7712-cc35-41e9-baba-bdea1b9f44e5', '2024-02-23 05:29:24.749+00', 'D1, HCM', 'f0c14310-37d9-484d-a1bf-7edae478a518', 'Predator XB273K', 492);
INSERT INTO "public"."storage" ("id", "created_at", "address", "prod_id", "prod_name", "quantity") VALUES ('4e019ba1-90f0-4b60-b91e-cbef22d182fc', '2024-02-22 15:11:36.104+00', 'D1, HCM', '747595ee-2137-4f64-8b4c-985a87d7554c', 'PlayStation 5', 34);
INSERT INTO "public"."storage" ("id", "created_at", "address", "prod_id", "prod_name", "quantity") VALUES ('061eeb65-1d20-4846-9f57-4620908b972f', '2024-02-23 07:40:31.32839+00', 'D1, HCM', '4eccc941-c41c-4184-8d7e-e4fd68a6dafb', 'Xbox Series X', 381);
INSERT INTO "public"."storage" ("id", "created_at", "address", "prod_id", "prod_name", "quantity") VALUES ('dca7fee1-0aa2-471b-84e9-fe11fe0137e3', '2024-02-23 07:42:32.054436+00', 'D1, HCM', 'bf563cdf-8347-4049-987d-bb6a117d3996', 'Oculus Quest 2', 33);
INSERT INTO "public"."storage" ("id", "created_at", "address", "prod_id", "prod_name", "quantity") VALUES ('7f3f5814-ff0d-4cc0-84be-6b4a6232279a', '2024-02-23 07:41:19.925062+00', 'D1, HCM', 'b69cd767-c68e-4344-8046-9454fd3b495b', 'Nintendo Switch', 35);
INSERT INTO "public"."storage" ("id", "created_at", "address", "prod_id", "prod_name", "quantity") VALUES ('ca6ec92f-c238-411f-8cdc-34acb20b8a3a', '2024-02-23 05:34:24.467+00', 'D1, HCM', 'fb217e38-fc22-4adc-aa9f-2022a9f65959', 'BlackWidow Elite', 238);
INSERT INTO "public"."storage" ("id", "created_at", "address", "prod_id", "prod_name", "quantity") VALUES ('9f89fa75-f83b-4059-aa36-4b699e4db064', '2024-02-22 14:34:30.899+00', 'D1, HCM', 'ef35d0f5-433e-420d-b3be-40da85a9171e', 'Gaming Strix Pro', 93);
INSERT INTO "public"."storage" ("id", "created_at", "address", "prod_id", "prod_name", "quantity") VALUES ('032c5ad4-1cfa-44ca-8f3a-0c93861d6399', '2024-02-23 16:12:09.832+00', 'D1, HCM', '1c191fac-ca8b-4585-8ce6-ee213ce10383', 'Supreme Gaming Chair', 17);
INSERT INTO "public"."storage" ("id", "created_at", "address", "prod_id", "prod_name", "quantity") VALUES ('7aa42dee-d5dd-4d3d-8f03-cc93a77c9ef9', '2024-02-26 16:16:39.949536+00', 'D1, HCM', '17723af0-c8e0-42a9-8200-72433193cc15', 'Arcade Pro Ultra', 45);
INSERT INTO "public"."storage" ("id", "created_at", "address", "prod_id", "prod_name", "quantity") VALUES ('9d5bee2a-5825-43a9-98fd-d98c6ae47b30', '2024-02-26 16:17:02.584289+00', 'D1, HCM', '8ba63d67-11b1-476e-b983-edd22dcb2ccf', 'Arcade Pro', 54);
INSERT INTO "public"."storage" ("id", "created_at", "address", "prod_id", "prod_name", "quantity") VALUES ('07afd797-2069-4ed5-b4de-85c50457724e', '2024-02-23 05:37:28.281+00', 'D1, HCM', 'd4336a4c-1084-4df8-a5f7-580e07c4da32', 'Gaming Router', 51);
INSERT INTO "public"."storage" ("id", "created_at", "address", "prod_id", "prod_name", "quantity") VALUES ('1511f03a-3f73-4ed3-b08c-c4819a86843c', '2024-02-23 07:41:59.571733+00', 'D1, HCM', 'c40ba9c3-71a5-4ccc-9a07-4be70e6df835', 'PlayStation VR', 27);
COMMIT;

-- ----------------------------
-- Primary Key structure for table storage
-- ----------------------------
ALTER TABLE "public"."storage" ADD CONSTRAINT "storage_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table storage
-- ----------------------------
ALTER TABLE "public"."storage" ADD CONSTRAINT "public_storage_prod_id_prod_name_fkey" FOREIGN KEY ("prod_id", "prod_name") REFERENCES "public"."product" ("id", "name") ON DELETE CASCADE ON UPDATE CASCADE;
