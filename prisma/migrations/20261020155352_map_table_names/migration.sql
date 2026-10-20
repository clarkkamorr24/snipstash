-- Rename tables to snake_case plural names (@@map) in place, preserving data.
-- Prisma generates DROP + CREATE for @@map changes, so this was rewritten by hand.

-- RenameTable
ALTER TABLE "User" RENAME TO "users";
ALTER TABLE "Account" RENAME TO "accounts";
ALTER TABLE "Session" RENAME TO "sessions";
ALTER TABLE "VerificationToken" RENAME TO "verification_tokens";
ALTER TABLE "Item" RENAME TO "items";
ALTER TABLE "ItemType" RENAME TO "item_types";
ALTER TABLE "Collection" RENAME TO "collections";
ALTER TABLE "ItemCollection" RENAME TO "item_collections";
ALTER TABLE "Tag" RENAME TO "tags";

-- RenamePrimaryKey
ALTER TABLE "users" RENAME CONSTRAINT "User_pkey" TO "users_pkey";
ALTER TABLE "accounts" RENAME CONSTRAINT "Account_pkey" TO "accounts_pkey";
ALTER TABLE "sessions" RENAME CONSTRAINT "Session_pkey" TO "sessions_pkey";
ALTER TABLE "items" RENAME CONSTRAINT "Item_pkey" TO "items_pkey";
ALTER TABLE "item_types" RENAME CONSTRAINT "ItemType_pkey" TO "item_types_pkey";
ALTER TABLE "collections" RENAME CONSTRAINT "Collection_pkey" TO "collections_pkey";
ALTER TABLE "item_collections" RENAME CONSTRAINT "ItemCollection_pkey" TO "item_collections_pkey";
ALTER TABLE "tags" RENAME CONSTRAINT "Tag_pkey" TO "tags_pkey";

-- RenameIndex
ALTER INDEX "User_email_key" RENAME TO "users_email_key";
ALTER INDEX "User_stripeCustomerId_key" RENAME TO "users_stripeCustomerId_key";
ALTER INDEX "User_stripeSubscriptionId_key" RENAME TO "users_stripeSubscriptionId_key";
ALTER INDEX "Account_userId_idx" RENAME TO "accounts_userId_idx";
ALTER INDEX "Account_provider_providerAccountId_key" RENAME TO "accounts_provider_providerAccountId_key";
ALTER INDEX "Session_sessionToken_key" RENAME TO "sessions_sessionToken_key";
ALTER INDEX "Session_userId_idx" RENAME TO "sessions_userId_idx";
ALTER INDEX "VerificationToken_token_key" RENAME TO "verification_tokens_token_key";
ALTER INDEX "VerificationToken_identifier_token_key" RENAME TO "verification_tokens_identifier_token_key";
ALTER INDEX "Item_userId_idx" RENAME TO "items_userId_idx";
ALTER INDEX "Item_userId_itemTypeId_idx" RENAME TO "items_userId_itemTypeId_idx";
ALTER INDEX "Item_userId_isPinned_idx" RENAME TO "items_userId_isPinned_idx";
ALTER INDEX "Item_userId_lastUsedAt_idx" RENAME TO "items_userId_lastUsedAt_idx";
ALTER INDEX "ItemType_userId_idx" RENAME TO "item_types_userId_idx";
ALTER INDEX "ItemType_userId_slug_key" RENAME TO "item_types_userId_slug_key";
ALTER INDEX "Collection_userId_idx" RENAME TO "collections_userId_idx";
ALTER INDEX "ItemCollection_collectionId_idx" RENAME TO "item_collections_collectionId_idx";
ALTER INDEX "Tag_userId_name_key" RENAME TO "tags_userId_name_key";

-- RenameForeignKey
ALTER TABLE "accounts" RENAME CONSTRAINT "Account_userId_fkey" TO "accounts_userId_fkey";
ALTER TABLE "sessions" RENAME CONSTRAINT "Session_userId_fkey" TO "sessions_userId_fkey";
ALTER TABLE "items" RENAME CONSTRAINT "Item_userId_fkey" TO "items_userId_fkey";
ALTER TABLE "items" RENAME CONSTRAINT "Item_itemTypeId_fkey" TO "items_itemTypeId_fkey";
ALTER TABLE "item_types" RENAME CONSTRAINT "ItemType_userId_fkey" TO "item_types_userId_fkey";
ALTER TABLE "collections" RENAME CONSTRAINT "Collection_userId_fkey" TO "collections_userId_fkey";
ALTER TABLE "collections" RENAME CONSTRAINT "Collection_defaultTypeId_fkey" TO "collections_defaultTypeId_fkey";
ALTER TABLE "item_collections" RENAME CONSTRAINT "ItemCollection_itemId_fkey" TO "item_collections_itemId_fkey";
ALTER TABLE "item_collections" RENAME CONSTRAINT "ItemCollection_collectionId_fkey" TO "item_collections_collectionId_fkey";
ALTER TABLE "tags" RENAME CONSTRAINT "Tag_userId_fkey" TO "tags_userId_fkey";
