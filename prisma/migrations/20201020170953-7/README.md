# Migration `20201020170953-7`

This migration has been generated by Milos at 10/20/2020, 7:09:53 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Character" ADD COLUMN "klassAbilityOne" boolean []  

DROP TABLE "public"."User"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201020164133-6..20201020170953-7
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -65,37 +65,38 @@
   characters Character[] @relation(references: [id])
 }
 model Character {
-  id             Int       @id @default(autoincrement())
-  name           String
-  level          Int       @default(1)
-  race           String
-  klass          Klass     @relation(fields: [klassId], references: [id])
-  klassId        Int
-  alignment      String
-  armorClass     Int       @default(10)
-  hitPoints      Int       @default(10)
-  maxHitPoints   Int       @default(10)
-  gold           Int?
-  inspiration    Boolean   @default(false)
-  strength       Int       @default(10)
-  dexterity      Int       @default(10)
-  constitution   Int       @default(10)
-  intelligence   Int       @default(10)
-  wisdom         Int       @default(10)
-  charisma       Int       @default(10)
-  user           User      @relation(fields: [userId], references: [id])
-  userId         Int
-  spells         Spell[]   @relation("KnownSpells")
-  preparedSpells Spell[]   @relation("PreparedSpells")
-  skills         Skill[]
-  subclass       SubClass? @relation(fields: [subclassId], references: [id])
-  subclassId     Int?
-  spellSlots     String?
-  speed          Int       @default(30)
-  arcaneWard     Int?
-  arcaneWardMax  Int?
+  id              Int       @id @default(autoincrement())
+  name            String
+  level           Int       @default(1)
+  race            String
+  klass           Klass     @relation(fields: [klassId], references: [id])
+  klassId         Int
+  alignment       String
+  armorClass      Int       @default(10)
+  hitPoints       Int       @default(10)
+  maxHitPoints    Int       @default(10)
+  gold            Int?
+  inspiration     Boolean   @default(false)
+  strength        Int       @default(10)
+  dexterity       Int       @default(10)
+  constitution    Int       @default(10)
+  intelligence    Int       @default(10)
+  wisdom          Int       @default(10)
+  charisma        Int       @default(10)
+  user            User      @relation(fields: [userId], references: [id])
+  userId          Int
+  spells          Spell[]   @relation("KnownSpells")
+  preparedSpells  Spell[]   @relation("PreparedSpells")
+  skills          Skill[]
+  subclass        SubClass? @relation(fields: [subclassId], references: [id])
+  subclassId      Int?
+  spellSlots      String?
+  klassAbilityOne Boolean[]
+  speed           Int       @default(30)
+  arcaneWard      Int?
+  arcaneWardMax   Int?
 }
 model Account {
   id                 Int       @id @default(autoincrement())
```


