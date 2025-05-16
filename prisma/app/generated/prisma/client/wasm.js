
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/wasm.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.AttachmentScalarFieldEnum = {
  id: 'id',
  entity: 'entity',
  entity_id: 'entity_id',
  group: 'group',
  src: 'src',
  position: 'position'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  emailVerified: 'emailVerified',
  password: 'password',
  role: 'role',
  image: 'image',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MenuScalarFieldEnum = {
  id: 'id',
  type: 'type',
  published: 'published',
  label: 'label',
  link: 'link',
  parent_id: 'parent_id',
  position: 'position'
};

exports.Prisma.SettingScalarFieldEnum = {
  id: 'id',
  code: 'code',
  input_type: 'input_type',
  value: 'value',
  label: 'label'
};

exports.Prisma.RobotScalarFieldEnum = {
  id: 'id',
  user_agent: 'user_agent',
  allow: 'allow',
  disallow: 'disallow'
};

exports.Prisma.CategoryCardScalarFieldEnum = {
  id: 'id',
  published: 'published',
  label: 'label'
};

exports.Prisma.CardScalarFieldEnum = {
  id: 'id',
  published: 'published',
  type: 'type',
  category_card_id: 'category_card_id',
  label: 'label',
  sub_label: 'sub_label',
  referral_key: 'referral_key',
  referral_link: 'referral_link',
  play_with_real_money: 'play_with_real_money',
  play_for_free: 'play_for_free',
  terms_and_condition: 'terms_and_condition'
};

exports.Prisma.FaqScalarFieldEnum = {
  id: 'id',
  published: 'published',
  question: 'question',
  answer: 'answer',
  position: 'position'
};

exports.Prisma.FaqCardScalarFieldEnum = {
  id: 'id',
  faq_id: 'faq_id',
  card_id: 'card_id',
  position: 'position'
};

exports.Prisma.OptionScalarFieldEnum = {
  id: 'id',
  published: 'published',
  use_for_filter: 'use_for_filter',
  input_type: 'input_type',
  type: 'type',
  label: 'label',
  tooltip: 'tooltip',
  hash_tag: 'hash_tag',
  value: 'value',
  position: 'position'
};

exports.Prisma.CardOptionScalarFieldEnum = {
  id: 'id',
  option_id: 'option_id',
  card_id: 'card_id',
  value: 'value'
};

exports.Prisma.IconCardScalarFieldEnum = {
  id: 'id',
  published: 'published',
  label: 'label'
};

exports.Prisma.IconCardImageScalarFieldEnum = {
  id: 'id',
  icon_card_id: 'icon_card_id',
  alt: 'alt',
  image: 'image',
  position: 'position'
};

exports.Prisma.CardIconImageScalarFieldEnum = {
  id: 'id',
  card_id: 'card_id',
  icon_card_image_id: 'icon_card_image_id'
};

exports.Prisma.CardImageScalarFieldEnum = {
  id: 'id',
  card_id: 'card_id',
  src: 'src'
};

exports.Prisma.PageScalarFieldEnum = {
  id: 'id',
  published: 'published',
  label: 'label',
  slug: 'slug',
  meta_title: 'meta_title',
  meta_description: 'meta_description',
  meta_keywords: 'meta_keywords',
  meta_noindex_nofollow: 'meta_noindex_nofollow'
};

exports.Prisma.BuilderScalarFieldEnum = {
  id: 'id',
  build_type: 'build_type',
  label: 'label'
};

exports.Prisma.BuildPageScalarFieldEnum = {
  id: 'id',
  build_id: 'build_id',
  page_id: 'page_id',
  position: 'position',
  field_values: 'field_values',
  card_type: 'card_type'
};

exports.Prisma.CasinoScalarFieldEnum = {
  id: 'id',
  published: 'published',
  name: 'name',
  tooltip: 'tooltip',
  image: 'image',
  referral_key: 'referral_key',
  referral_link: 'referral_link',
  full_review_label: 'full_review_label',
  full_review_link: 'full_review_link'
};

exports.Prisma.CasinoOptionScalarFieldEnum = {
  id: 'id',
  option_id: 'option_id',
  casino_id: 'casino_id',
  value: 'value'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.AttachmentOrderByRelevanceFieldEnum = {
  entity: 'entity',
  group: 'group',
  src: 'src'
};

exports.Prisma.UserOrderByRelevanceFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  password: 'password',
  image: 'image'
};

exports.Prisma.MenuOrderByRelevanceFieldEnum = {
  label: 'label',
  link: 'link'
};

exports.Prisma.SettingOrderByRelevanceFieldEnum = {
  code: 'code',
  value: 'value',
  label: 'label'
};

exports.Prisma.RobotOrderByRelevanceFieldEnum = {
  user_agent: 'user_agent',
  allow: 'allow',
  disallow: 'disallow'
};

exports.Prisma.CategoryCardOrderByRelevanceFieldEnum = {
  label: 'label'
};

exports.Prisma.CardOrderByRelevanceFieldEnum = {
  label: 'label',
  sub_label: 'sub_label',
  referral_key: 'referral_key',
  referral_link: 'referral_link',
  play_with_real_money: 'play_with_real_money',
  play_for_free: 'play_for_free',
  terms_and_condition: 'terms_and_condition'
};

exports.Prisma.FaqOrderByRelevanceFieldEnum = {
  question: 'question',
  answer: 'answer'
};

exports.Prisma.OptionOrderByRelevanceFieldEnum = {
  label: 'label',
  tooltip: 'tooltip',
  hash_tag: 'hash_tag',
  value: 'value'
};

exports.Prisma.CardOptionOrderByRelevanceFieldEnum = {
  value: 'value'
};

exports.Prisma.IconCardOrderByRelevanceFieldEnum = {
  label: 'label'
};

exports.Prisma.IconCardImageOrderByRelevanceFieldEnum = {
  alt: 'alt',
  image: 'image'
};

exports.Prisma.CardImageOrderByRelevanceFieldEnum = {
  src: 'src'
};

exports.Prisma.PageOrderByRelevanceFieldEnum = {
  label: 'label',
  slug: 'slug',
  meta_title: 'meta_title',
  meta_description: 'meta_description',
  meta_keywords: 'meta_keywords'
};

exports.Prisma.BuilderOrderByRelevanceFieldEnum = {
  label: 'label'
};

exports.Prisma.BuildPageOrderByRelevanceFieldEnum = {
  field_values: 'field_values',
  card_type: 'card_type'
};

exports.Prisma.CasinoOrderByRelevanceFieldEnum = {
  name: 'name',
  tooltip: 'tooltip',
  image: 'image',
  referral_key: 'referral_key',
  referral_link: 'referral_link',
  full_review_label: 'full_review_label',
  full_review_link: 'full_review_link'
};

exports.Prisma.CasinoOptionOrderByRelevanceFieldEnum = {
  value: 'value'
};
exports.UserRole = exports.$Enums.UserRole = {
  admin: 'admin',
  user: 'user'
};

exports.MenuType = exports.$Enums.MenuType = {
  top: 'top',
  footer_popular_category: 'footer_popular_category',
  footer_information: 'footer_information'
};

exports.CardType = exports.$Enums.CardType = {
  slot_game: 'slot_game',
  card_game: 'card_game',
  casono_card: 'casono_card',
  cart: 'cart'
};

exports.InputType = exports.$Enums.InputType = {
  text: 'text',
  password: 'password',
  select: 'select',
  textarea: 'textarea',
  image: 'image'
};

exports.BuildType = exports.$Enums.BuildType = {
  text: 'text',
  textarea: 'textarea',
  htmlEditor: 'htmlEditor',
  categoryCard: 'categoryCard',
  faq: 'faq',
  CasinoTop: 'CasinoTop'
};

exports.OptionType = exports.$Enums.OptionType = {
  card: 'card',
  casino: 'casino'
};

exports.Prisma.ModelName = {
  Attachment: 'Attachment',
  User: 'User',
  Menu: 'Menu',
  Setting: 'Setting',
  Robot: 'Robot',
  CategoryCard: 'CategoryCard',
  Card: 'Card',
  Faq: 'Faq',
  FaqCard: 'FaqCard',
  Option: 'Option',
  CardOption: 'CardOption',
  IconCard: 'IconCard',
  IconCardImage: 'IconCardImage',
  CardIconImage: 'CardIconImage',
  CardImage: 'CardImage',
  Page: 'Page',
  Builder: 'Builder',
  BuildPage: 'BuildPage',
  Casino: 'Casino',
  CasinoOption: 'CasinoOption'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/app/prisma/app/generated/prisma/client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "linux-musl-openssl-3.0.x",
        "native": true
      }
    ],
    "previewFeatures": [
      "driverAdapters"
    ],
    "sourceFilePath": "/app/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../../../.env"
  },
  "relativePath": "../../../..",
  "clientVersion": "6.6.0",
  "engineVersion": "f676762280b54cd07c770017ed3711ddde35f37a",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "mysql",
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": "mysql://root:root@mariadb:3306/koray_prod"
      }
    }
  },
  "inlineSchema": "generator client {\n  provider        = \"prisma-client-js\"\n  output          = \"app/generated/prisma/client\"\n  previewFeatures = [\"driverAdapters\"]\n}\n\ndatasource db {\n  provider = \"mysql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel Attachment {\n  id        Int    @id @default(autoincrement())\n  entity    String\n  entity_id Int\n  group     String @default(\"default\")\n  src       String\n  position  Int?\n\n  @@index([entity, entity_id])\n}\n\nmodel User {\n  id            String    @id @default(cuid())\n  name          String?\n  email         String    @unique\n  emailVerified DateTime?\n  password      String?\n  role          UserRole  @default(user)\n  image         String?\n  createdAt     DateTime  @default(now())\n  updatedAt     DateTime  @updatedAt\n}\n\nmodel Menu {\n  id        Int      @id @default(autoincrement())\n  type      MenuType\n  published Boolean\n  label     String\n  link      String\n  parent_id Int?\n  position  Int      @default(1)\n  parent    Menu?    @relation(\"SubMenu\", fields: [parent_id], references: [id])\n  children  Menu[]   @relation(\"SubMenu\")\n\n  @@index([parent_id], map: \"Menu_parent_id_fkey\")\n}\n\nmodel Setting {\n  id         Int       @id @default(autoincrement())\n  code       String    @unique\n  input_type InputType @default(text)\n  value      String    @db.Text\n  label      String\n}\n\nmodel Robot {\n  id         Int     @id @default(autoincrement())\n  user_agent String\n  allow      String?\n  disallow   String?\n}\n\nmodel CategoryCard {\n  id        Int     @id @default(autoincrement())\n  published Boolean @default(false)\n  label     String\n  cards     Card[]  @relation(\"CategoryCardRelation\")\n}\n\nmodel Card {\n  id                   Int             @id @default(autoincrement())\n  published            Boolean\n  type                 CardType\n  category_card_id     Int?\n  label                String\n  sub_label            String?\n  referral_key         String          @unique\n  referral_link        String?\n  play_with_real_money String?\n  play_for_free        String?\n  terms_and_condition  String?         @db.Text\n  category_card        CategoryCard?   @relation(\"CategoryCardRelation\", fields: [category_card_id], references: [id])\n  icon_card_images     CardIconImage[]\n  images               CardImage[]\n  options              CardOption[]\n  faqs                 FaqCard[]\n\n  @@index([category_card_id], map: \"Card_category_card_id_fkey\")\n  @@index([type], map: \"Card_type_idx\")\n}\n\nmodel Faq {\n  id        Int       @id @default(autoincrement())\n  published Boolean   @default(false)\n  question  String\n  answer    String\n  position  Int?\n  cards     FaqCard[]\n}\n\nmodel FaqCard {\n  id       Int  @id @default(autoincrement())\n  faq_id   Int\n  card_id  Int\n  position Int?\n  card     Card @relation(fields: [card_id], references: [id])\n  faq      Faq  @relation(fields: [faq_id], references: [id])\n\n  @@index([card_id], map: \"FaqCard_card_id_fkey\")\n  @@index([faq_id], map: \"FaqCard_faq_id_fkey\")\n}\n\nmodel Option {\n  id             Int            @id @default(autoincrement())\n  published      Boolean\n  use_for_filter Boolean\n  input_type     InputType\n  type           OptionType     @default(card)\n  label          String\n  tooltip        String?\n  hash_tag       String?\n  value          String         @db.Text\n  position       Int?\n  card_options   CardOption[]\n  casino_options CasinoOption[]\n\n  @@index([type], map: \"Option_type_idx\")\n}\n\nmodel CardOption {\n  id        Int    @id @default(autoincrement())\n  option_id Int\n  card_id   Int\n  value     String\n  card      Card   @relation(fields: [card_id], references: [id])\n  entity    Option @relation(fields: [option_id], references: [id])\n\n  @@index([card_id], map: \"CardOption_card_id_fkey\")\n  @@index([option_id], map: \"CardOption_option_id_fkey\")\n}\n\nmodel IconCard {\n  id        Int             @id @default(autoincrement())\n  published Boolean         @default(false)\n  label     String\n  images    IconCardImage[]\n}\n\nmodel IconCardImage {\n  id           Int             @id @default(autoincrement())\n  icon_card_id Int\n  alt          String\n  image        String\n  position     Int?\n  icon_card    IconCard        @relation(fields: [icon_card_id], references: [id])\n  cards        CardIconImage[]\n\n  @@index([icon_card_id])\n}\n\nmodel CardIconImage {\n  id                 Int           @id @default(autoincrement())\n  card_id            Int\n  icon_card_image_id Int\n  card               Card          @relation(fields: [card_id], references: [id])\n  icon_card_image    IconCardImage @relation(fields: [icon_card_image_id], references: [id])\n\n  @@index([card_id])\n  @@index([icon_card_image_id])\n}\n\nmodel CardImage {\n  id      Int    @id @default(autoincrement())\n  card_id Int\n  src     String\n  card    Card   @relation(fields: [card_id], references: [id])\n\n  @@index([card_id], map: \"CardImage_card_id_fkey\")\n}\n\nmodel Page {\n  id                    Int         @id @default(autoincrement())\n  published             Boolean     @default(false)\n  label                 String\n  slug                  String      @unique\n  meta_title            String\n  meta_description      String\n  meta_keywords         String\n  meta_noindex_nofollow Boolean     @default(false)\n  builds                BuildPage[]\n}\n\nmodel Builder {\n  id         Int         @id @default(autoincrement())\n  build_type BuildType   @default(text)\n  label      String\n  pages      BuildPage[]\n}\n\nmodel BuildPage {\n  id           Int     @id @default(autoincrement())\n  build_id     Int\n  page_id      Int\n  position     Int\n  field_values String  @db.LongText\n  card_type    String?\n  build        Builder @relation(fields: [build_id], references: [id])\n  page         Page    @relation(fields: [page_id], references: [id])\n\n  @@index([build_id], map: \"BuildPage_build_id_fkey\")\n  @@index([page_id], map: \"BuildPage_page_id_fkey\")\n}\n\nenum UserRole {\n  admin\n  user\n}\n\nenum MenuType {\n  top\n  footer_popular_category\n  footer_information\n}\n\nenum CardType {\n  slot_game\n  card_game\n  casono_card\n  cart\n}\n\nenum InputType {\n  text\n  password\n  select\n  textarea\n  image\n}\n\nenum BuildType {\n  text\n  textarea\n  htmlEditor\n  categoryCard\n  faq\n  CasinoTop\n}\n\nenum OptionType {\n  card\n  casino\n}\n\nmodel Casino {\n  id                Int            @id @default(autoincrement())\n  published         Boolean        @default(false)\n  name              String\n  tooltip           String?\n  image             String\n  referral_key      String         @unique\n  referral_link     String?\n  full_review_label String?\n  full_review_link  String?\n  options           CasinoOption[]\n}\n\nmodel CasinoOption {\n  id        Int    @id @default(autoincrement())\n  option_id Int\n  casino_id Int\n  value     String\n  casino    Casino @relation(fields: [casino_id], references: [id])\n  entity    Option @relation(fields: [option_id], references: [id])\n\n  @@index([casino_id], map: \"CasinoOption_casino_id_fkey\")\n  @@index([option_id], map: \"CasinoOption_option_id_fkey\")\n}\n",
  "inlineSchemaHash": "26525b7eb253a74fde6dff513a36bdf7c0898b7c70271adf326f17f7ad55606d",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Attachment\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"entity\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"group\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"src\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"position\",\"kind\":\"scalar\",\"type\":\"Int\"}],\"dbName\":null},\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"emailVerified\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"enum\",\"type\":\"UserRole\"},{\"name\":\"image\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Menu\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"type\",\"kind\":\"enum\",\"type\":\"MenuType\"},{\"name\":\"published\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"label\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"link\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"parent_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"position\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"parent\",\"kind\":\"object\",\"type\":\"Menu\",\"relationName\":\"SubMenu\"},{\"name\":\"children\",\"kind\":\"object\",\"type\":\"Menu\",\"relationName\":\"SubMenu\"}],\"dbName\":null},\"Setting\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"code\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"input_type\",\"kind\":\"enum\",\"type\":\"InputType\"},{\"name\":\"value\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"label\",\"kind\":\"scalar\",\"type\":\"String\"}],\"dbName\":null},\"Robot\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"user_agent\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"allow\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"disallow\",\"kind\":\"scalar\",\"type\":\"String\"}],\"dbName\":null},\"CategoryCard\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"published\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"label\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"cards\",\"kind\":\"object\",\"type\":\"Card\",\"relationName\":\"CategoryCardRelation\"}],\"dbName\":null},\"Card\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"published\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"type\",\"kind\":\"enum\",\"type\":\"CardType\"},{\"name\":\"category_card_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"label\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sub_label\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"referral_key\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"referral_link\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"play_with_real_money\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"play_for_free\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"terms_and_condition\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"category_card\",\"kind\":\"object\",\"type\":\"CategoryCard\",\"relationName\":\"CategoryCardRelation\"},{\"name\":\"icon_card_images\",\"kind\":\"object\",\"type\":\"CardIconImage\",\"relationName\":\"CardToCardIconImage\"},{\"name\":\"images\",\"kind\":\"object\",\"type\":\"CardImage\",\"relationName\":\"CardToCardImage\"},{\"name\":\"options\",\"kind\":\"object\",\"type\":\"CardOption\",\"relationName\":\"CardToCardOption\"},{\"name\":\"faqs\",\"kind\":\"object\",\"type\":\"FaqCard\",\"relationName\":\"CardToFaqCard\"}],\"dbName\":null},\"Faq\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"published\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"question\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"answer\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"position\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"cards\",\"kind\":\"object\",\"type\":\"FaqCard\",\"relationName\":\"FaqToFaqCard\"}],\"dbName\":null},\"FaqCard\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"faq_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"card_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"position\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"card\",\"kind\":\"object\",\"type\":\"Card\",\"relationName\":\"CardToFaqCard\"},{\"name\":\"faq\",\"kind\":\"object\",\"type\":\"Faq\",\"relationName\":\"FaqToFaqCard\"}],\"dbName\":null},\"Option\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"published\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"use_for_filter\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"input_type\",\"kind\":\"enum\",\"type\":\"InputType\"},{\"name\":\"type\",\"kind\":\"enum\",\"type\":\"OptionType\"},{\"name\":\"label\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"tooltip\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"hash_tag\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"value\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"position\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"card_options\",\"kind\":\"object\",\"type\":\"CardOption\",\"relationName\":\"CardOptionToOption\"},{\"name\":\"casino_options\",\"kind\":\"object\",\"type\":\"CasinoOption\",\"relationName\":\"CasinoOptionToOption\"}],\"dbName\":null},\"CardOption\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"option_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"card_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"value\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"card\",\"kind\":\"object\",\"type\":\"Card\",\"relationName\":\"CardToCardOption\"},{\"name\":\"entity\",\"kind\":\"object\",\"type\":\"Option\",\"relationName\":\"CardOptionToOption\"}],\"dbName\":null},\"IconCard\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"published\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"label\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"images\",\"kind\":\"object\",\"type\":\"IconCardImage\",\"relationName\":\"IconCardToIconCardImage\"}],\"dbName\":null},\"IconCardImage\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"icon_card_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"alt\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"image\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"position\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"icon_card\",\"kind\":\"object\",\"type\":\"IconCard\",\"relationName\":\"IconCardToIconCardImage\"},{\"name\":\"cards\",\"kind\":\"object\",\"type\":\"CardIconImage\",\"relationName\":\"CardIconImageToIconCardImage\"}],\"dbName\":null},\"CardIconImage\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"card_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"icon_card_image_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"card\",\"kind\":\"object\",\"type\":\"Card\",\"relationName\":\"CardToCardIconImage\"},{\"name\":\"icon_card_image\",\"kind\":\"object\",\"type\":\"IconCardImage\",\"relationName\":\"CardIconImageToIconCardImage\"}],\"dbName\":null},\"CardImage\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"card_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"src\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"card\",\"kind\":\"object\",\"type\":\"Card\",\"relationName\":\"CardToCardImage\"}],\"dbName\":null},\"Page\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"published\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"label\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"slug\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"meta_title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"meta_description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"meta_keywords\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"meta_noindex_nofollow\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"builds\",\"kind\":\"object\",\"type\":\"BuildPage\",\"relationName\":\"BuildPageToPage\"}],\"dbName\":null},\"Builder\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"build_type\",\"kind\":\"enum\",\"type\":\"BuildType\"},{\"name\":\"label\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"pages\",\"kind\":\"object\",\"type\":\"BuildPage\",\"relationName\":\"BuildPageToBuilder\"}],\"dbName\":null},\"BuildPage\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"build_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"page_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"position\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"field_values\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"card_type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"build\",\"kind\":\"object\",\"type\":\"Builder\",\"relationName\":\"BuildPageToBuilder\"},{\"name\":\"page\",\"kind\":\"object\",\"type\":\"Page\",\"relationName\":\"BuildPageToPage\"}],\"dbName\":null},\"Casino\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"published\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"tooltip\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"image\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"referral_key\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"referral_link\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"full_review_label\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"full_review_link\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"options\",\"kind\":\"object\",\"type\":\"CasinoOption\",\"relationName\":\"CasinoToCasinoOption\"}],\"dbName\":null},\"CasinoOption\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"option_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"casino_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"value\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"casino\",\"kind\":\"object\",\"type\":\"Casino\",\"relationName\":\"CasinoToCasinoOption\"},{\"name\":\"entity\",\"kind\":\"object\",\"type\":\"Option\",\"relationName\":\"CasinoOptionToOption\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: async () => require('./query_engine_bg.js'),
  getQueryEngineWasmModule: async () => {
    const loader = (await import('#wasm-engine-loader')).default
    const engine = (await loader).default
    return engine
  }
}
config.compilerWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

