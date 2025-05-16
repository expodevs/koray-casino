
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


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

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

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
  description: 'description',
  referral_key: 'referral_key',
  referral_btn_1_link: 'referral_btn_1_link',
  referral_btn_2_link: 'referral_btn_2_link',
  position: 'position',
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
  src: 'src',
  alt: 'alt',
  position: 'position'
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
  description: 'description',
  referral_key: 'referral_key',
  referral_btn_1_link: 'referral_btn_1_link',
  referral_btn_2_link: 'referral_btn_2_link',
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
  src: 'src',
  alt: 'alt'
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

exports.InputType = exports.$Enums.InputType = {
  text: 'text',
  password: 'password',
  select: 'select',
  textarea: 'textarea',
  image: 'image'
};

exports.CardType = exports.$Enums.CardType = {
  card: 'card',
  cart: 'cart'
};

exports.OptionType = exports.$Enums.OptionType = {
  card: 'card',
  casino: 'casino'
};

exports.BuildType = exports.$Enums.BuildType = {
  text: 'text',
  textarea: 'textarea',
  htmlEditor: 'htmlEditor',
  categoryCard: 'categoryCard',
  faq: 'faq',
  CasinoTop: 'CasinoTop'
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
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
