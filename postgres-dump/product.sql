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

 Date: 21/03/2024 22:40:43
*/


-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS "public"."product";
CREATE TABLE "public"."product" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "created_at" timestamptz(6) NOT NULL DEFAULT now(),
  "brand" text COLLATE "pg_catalog"."default",
  "name" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'Unknown'::text,
  "description" text COLLATE "pg_catalog"."default",
  "images" text[] COLLATE "pg_catalog"."default",
  "price" int4,
  "options" text[] COLLATE "pg_catalog"."default",
  "rate" float4,
  "sold_quantity" int4,
  "category" text COLLATE "pg_catalog"."default",
  "description_id" uuid,
  "is_deleted" bool DEFAULT false
)
;
ALTER TABLE "public"."product" OWNER TO "postgres";

-- ----------------------------
-- Records of product
-- ----------------------------
BEGIN;
INSERT INTO "public"."product" ("id", "created_at", "brand", "name", "description", "images", "price", "options", "rate", "sold_quantity", "category", "description_id", "is_deleted") VALUES ('fb217e38-fc22-4adc-aa9f-2022a9f65959', '2024-02-23 05:34:24.336+00', 'Razer', 'BlackWidow Elite', 'Just a Gaming Keyboard with well-built design for gamer.', '{product_images/g10.png,product_images/g8.png,product_images/g18.png,product_images/g9.png,product_images/g15.png,product_images/g12.png,product_images/g7.png,product_images/g16.png}', 2000000, '{"Mechanical Gaming Keyboard","RGB Chroma Lighting"}', 5, 12, 'Accessories', 'fbafa932-e8c4-4092-b9fc-951080eea42b', 'f');
INSERT INTO "public"."product" ("id", "created_at", "brand", "name", "description", "images", "price", "options", "rate", "sold_quantity", "category", "description_id", "is_deleted") VALUES ('17723af0-c8e0-42a9-8200-72433193cc15', '2024-02-26 15:40:32.804494+00', 'Apple', 'Arcade Pro Ultra', 'The better performance device that is really outstanding.', '{product_images/g8.png,product_images/g18.png,product_images/g9.png,product_images/g15.png,product_images/g10.png,product_images/g12.png,product_images/g7.png,product_images/g16.png}', 14000000, '{1TB,2TB,5TB}', 5, 30, 'Consoles', '007652b5-0087-4e09-a688-2a7952a84682', 'f');
INSERT INTO "public"."product" ("id", "created_at", "brand", "name", "description", "images", "price", "options", "rate", "sold_quantity", "category", "description_id", "is_deleted") VALUES ('d4336a4c-1084-4df8-a5f7-580e07c4da32', '2024-02-23 05:37:28.14+00', 'ASUS', 'Gaming Router', 'Just a Gaming Router with large area of wireless internet.', '{product_images/g15.png,product_images/g8.png,product_images/g18.png,product_images/g9.png,product_images/g10.png,product_images/g12.png,product_images/g7.png,product_images/g16.png}', 2500000, '{"WiFi 5","WiFi 6"}', 4.5, 24, 'Networking', '007652b5-0087-4e09-a688-2a7952a84682', 'f');
INSERT INTO "public"."product" ("id", "created_at", "brand", "name", "description", "images", "price", "options", "rate", "sold_quantity", "category", "description_id", "is_deleted") VALUES ('747595ee-2137-4f64-8b4c-985a87d7554c', '2024-02-22 15:11:35.87+00', 'Sony', 'PlayStation 5', 'Just a description of the gaming product, with high-end equipment and a powerful processor.', '{product_images/g7.png,product_images/g8.png,product_images/g18.png,product_images/g9.png,product_images/g15.png,product_images/g10.png,product_images/g12.png,product_images/g16.png}', 1000000, '{Saving,Standard,Premium,Highend}', 4.2, 16, 'Consoles', '3f7e6dba-bddf-44bc-88e9-ae07f91cdf8d', 'f');
INSERT INTO "public"."product" ("id", "created_at", "brand", "name", "description", "images", "price", "options", "rate", "sold_quantity", "category", "description_id", "is_deleted") VALUES ('8ba63d67-11b1-476e-b983-edd22dcb2ccf', '2024-02-26 15:38:32.447156+00', 'Apple', 'Arcade Pro', 'Just a Virtual Reality device for the better experience', '{product_images/g8.png,product_images/g18.png,product_images/g9.png,product_images/g15.png,product_images/g10.png,product_images/g12.png,product_images/g7.png,product_images/g16.png}', 18000000, '{Silver,Blue,Space}', 5, 80, 'Consoles', 'fbafa932-e8c4-4092-b9fc-951080eea42b', 'f');
INSERT INTO "public"."product" ("id", "created_at", "brand", "name", "description", "images", "price", "options", "rate", "sold_quantity", "category", "description_id", "is_deleted") VALUES ('bf563cdf-8347-4049-987d-bb6a117d3996', '2024-02-23 07:34:06.58139+00', 'Oculus', 'Oculus Quest 2', 'Step into the future of virtual reality with Oculus Quest 2. With all-in-one gaming and immersive experiences, it''s never been easier to dive into VR gaming.', '{product_images/g18.png,product_images/g8.png,product_images/g9.png,product_images/g15.png,product_images/g10.png,product_images/g12.png,product_images/g7.png,product_images/g16.png}', 299000, '{64GB,256GB}', 3.5, 81, 'Reality', 'fbafa932-e8c4-4092-b9fc-951080eea42b', 'f');
INSERT INTO "public"."product" ("id", "created_at", "brand", "name", "description", "images", "price", "options", "rate", "sold_quantity", "category", "description_id", "is_deleted") VALUES ('ef35d0f5-433e-420d-b3be-40da85a9171e', '2024-02-22 14:34:30.388+00', 'Asus', 'Gaming Strix Pro', 'A gaming system for high-end experience, with lots of convenience.', '{product_images/g7.png,product_images/g8.png,product_images/g18.png,product_images/g9.png,product_images/g15.png,product_images/g10.png,product_images/g12.png,product_images/g16.png}', 10000000, '{1TB,2TB,5TB,Ultra}', 5, 7, 'Gaming', '4a0bc1a7-f554-4f2a-9cd8-b8ecf3e32924', 'f');
INSERT INTO "public"."product" ("id", "created_at", "brand", "name", "description", "images", "price", "options", "rate", "sold_quantity", "category", "description_id", "is_deleted") VALUES ('b69cd767-c68e-4344-8046-9454fd3b495b', '2024-02-23 07:34:06.58139+00', 'Nintendo', 'Nintendo Switch', 'Discover the versatility of Nintendo Switch. Play at home on the TV or on-the-go with handheld mode. With a wide selection of games and unique play styles, there''s something for everyone.', '{product_images/g8.png,product_images/g18.png,product_images/g9.png,product_images/g15.png,product_images/g10.png,product_images/g12.png,product_images/g7.png,product_images/g16.png}', 299000, '{"Standard Edition","Lite Edition"}', 4.6, 123, 'Consoles', 'fbafa932-e8c4-4092-b9fc-951080eea42b', 'f');
INSERT INTO "public"."product" ("id", "created_at", "brand", "name", "description", "images", "price", "options", "rate", "sold_quantity", "category", "description_id", "is_deleted") VALUES ('c40ba9c3-71a5-4ccc-9a07-4be70e6df835', '2024-02-23 07:34:06.58139+00', 'Sony', 'PlayStation VR', 'Immerse yourself in virtual reality gaming with PlayStation VR. Explore virtual worlds, battle enemies, and experience breathtaking adventures like never before.', '{product_images/g10.png,product_images/g8.png,product_images/g18.png,product_images/g9.png,product_images/g15.png,product_images/g12.png,product_images/g7.png,product_images/g16.png}', 299000, '{"Starter Kit","Standard Edition"}', 4, 53, 'Reality', 'fbafa932-e8c4-4092-b9fc-951080eea42b', 'f');
INSERT INTO "public"."product" ("id", "created_at", "brand", "name", "description", "images", "price", "options", "rate", "sold_quantity", "category", "description_id", "is_deleted") VALUES ('4eccc941-c41c-4184-8d7e-e4fd68a6dafb', '2024-02-23 07:34:06.58139+00', 'Microsoft', 'Xbox Series X', 'Introducing Xbox Series X, the fastest, most powerful Xbox ever. With next-gen performance and 4K gaming capabilities, immerse yourself in your favorite games like never before.', '{product_images/g10.png,product_images/g8.png,product_images/g18.png,product_images/g9.png,product_images/g15.png,product_images/g12.png,product_images/g7.png,product_images/g16.png}', 499000, '{"Standard Edition","High-end Edition"}', 2.8, 91, 'Consoles', 'fbafa932-e8c4-4092-b9fc-951080eea42b', 'f');
INSERT INTO "public"."product" ("id", "created_at", "brand", "name", "description", "images", "price", "options", "rate", "sold_quantity", "category", "description_id", "is_deleted") VALUES ('f0c14310-37d9-484d-a1bf-7edae478a518', '2024-02-23 05:29:24.198+00', 'Acer', 'Predator XB273K', 'Just a smart Gaming Monitor, with ultra solution finescreen.', '{product_images/g9.png,product_images/g8.png,product_images/g18.png,product_images/g15.png,product_images/g10.png,product_images/g12.png,product_images/g7.png,product_images/g16.png}', 9000000, '{"27\" 4K","24\" 2K","24\" FHD"}', 4.9, 8, 'Monitors', '64b3f700-a247-4812-857f-08944db6f737', 'f');
INSERT INTO "public"."product" ("id", "created_at", "brand", "name", "description", "images", "price", "options", "rate", "sold_quantity", "category", "description_id", "is_deleted") VALUES ('1c191fac-ca8b-4585-8ce6-ee213ce10383', '2024-02-23 16:12:09.243+00', 'Supreme', 'Supreme Gaming Chair', 'Elevate your gaming setup with the Supreme Gaming Chair. Designed for ultimate comfort and style, this chair features premium materials and ergonomic design, ensuring hours of comfortable gaming.', '{product_images/g11.png,product_images/g13.png,product_images/g14.png,product_images/g17.png}', 16000000, '{Red,Black,Green}', 5, 8, 'Furniture', 'c597b23b-4a7b-4321-b5b8-aee7995cfc13', 'f');
COMMIT;

-- ----------------------------
-- Primary Key structure for table product
-- ----------------------------
ALTER TABLE "public"."product" ADD CONSTRAINT "product_pkey" PRIMARY KEY ("id", "name");

-- ----------------------------
-- Foreign Keys structure for table product
-- ----------------------------
ALTER TABLE "public"."product" ADD CONSTRAINT "public_product_description_id_fkey" FOREIGN KEY ("description_id") REFERENCES "public"."product_description" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
