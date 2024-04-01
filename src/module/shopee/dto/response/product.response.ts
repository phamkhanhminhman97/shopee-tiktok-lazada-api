import { ShopeeResponseCommon } from './config.response';

interface CommentReply {
  reply?: string;
  hidden?: boolean;
}

interface ResponseComment {
  comment_id?: number;
  comment?: string;
  buyer_username?: string;
  order_sn?: string;
  item_id?: number;
  model_id?: number;
  create_time?: any;
  rating_star?: number;
  editable?: string;
  hidden?: boolean;
  comment_reply?: CommentReply;
}

interface ItemList {
  item: Array<Item>;
  total_count: number;
  has_next_page: boolean;
  next_offset: number;
}

interface Model {
  model_id: number;
  tier_index: Array<any>;
  promotion_id: number;
  model_sku: string;
  //Should be MODEL_NORMAL or MODEL_UNAVAILABLE.
  //MODEL_NORMAL models can be sold on the buyer's side,
  //and MODEL_UNAVAILABLE models cannot be sold on the buyer's side.
  model_status: string;
  pre_order: any;
  stock_info_v2: StockInfoV2;
}

interface ModelList {
  tier_variation: Array<any>;
  model: Array<Model>;
}
type ResponseGetModelList = ShopeeResponseCommon<ModelList>;

interface FailureList {
  item_id: number;
  failed_reason: string;
}

interface SuccessList {
  item_id: number;
  unlist: boolean;
}

interface UnlistItem {
  failure_list: Array<FailureList>;
  success_list: Array<SuccessList>;
}

interface UpdateStock {
  failure_list: Array<FailureList>;
  success_list: Array<SuccessList>;
}

interface PriceInfo {
  currency: string;
  original_price: number;
  current_price: number;
  inflated_price_of_original_price: number;
  inflated_price_of_current_price: number;
  sip_item_price: number;
  sip_item_price_source: string;
}

interface StockInfo {
  stock_type: number;
  stock_location_id: string;
  current_stock: number;
  normal_stock: number;
  reserved_stock: number;
}

interface Image {
  image_url_list: string[];
  image_id_list: string[];
}

interface Dimension {
  package_length: number;
  package_width: number;
  package_height: number;
}

interface LogisticInfo {
  logistic_id: number;
  logistic_name: string;
  enabled: boolean;
  shipping_fee: number;
  size_id: number;
  is_free: boolean;
  estimated_shipping_fee: number;
}

interface PreOrder {
  is_pre_order: boolean;
  days_to_ship: number;
}

interface Wholesale {
  min_count: number;
  max_count: number;
  unit_price: number;
  inflated_price_of_unit_price: number;
}

interface ComplaintPolicy {
  warranty_time: string;
  exclude_entrepreneur_warranty: boolean;
  complaint_address_id: number;
  additional_information: string;
}

interface VideoInfo {
  video_url: string;
  thumbnail_url: string;
  duration: number;
}

interface ExtendedDescription {
  field_type: string;
  text: string;
  image_info: {
    image_id: string;
    image_url: string;
  };
}

interface DescriptionInfo {
  extended_description: {
    field_list: ExtendedDescription[];
  };
}

interface TaxInfo {
  ncm: string;
  diff_state_cfop: string;
  csosn: string;
  origin: string;
  cest: string;
  measure_unit: string;
  invoice_option: string;
  vat_rate: string;
  hs_code: string;
  tax_code: string;
}

interface SummaryInfo {
  total_reserved_stock: number;
  total_available_stock: number;
}

interface SellerStock {
  location_id: string;
  stock: number;
}

interface ShopeeStock {
  location_id: string;
  stock: number;
}

interface StockInfoV2 {
  summary_info: SummaryInfo;
  seller_stock: SellerStock[];
  shopee_stock: ShopeeStock[];
}

interface Item {
  item_id: number;
  category_id: number;
  item_name: string;
  description: string;
  item_sku: string;
  create_time: number;
  update_time: number;
  attribute_list: Attribute[];
  price_info: PriceInfo[];
  stock_info: StockInfo[];
  image: Image;
  weight: number;
  dimension: Dimension;
  logistic_info: LogisticInfo[];
  pre_order: PreOrder;
  wholesales: Wholesale[];
  condition: string;
  size_chart: string;
  item_status: string;
  deboost: string;
  has_model: boolean;
  promotion_id: number;
  video_info: VideoInfo[];
  brand: Brand;
  item_dangerous: number;
  complaint_policy: ComplaintPolicy;
  tax_info: TaxInfo;
  description_info: DescriptionInfo;
  description_type: string;
  stock_info_v2: StockInfoV2;
}

interface ProductBaseItemInfo {
  item_list: Item[];
}
interface Category {
  category_id: number;
  parent_category_id: number;
  original_category_name: string;
  display_category_name: string;
  has_children: boolean;
}

interface Categories {
  category_list: Category[];
}

interface AttributeValue {
  value_id: number;
  original_value_name: string;
  display_value_name: string;
  value_unit: string;
  parent_attribute_list: {
    parent_attribute_id: number;
    parent_value_id: number;
  }[];
  parent_brand_list: {
    parent_brand_id: number;
  }[];
}

interface Attribute {
  attribute_id: number;
  original_attribute_name: string;
  display_attribute_name: string;
  is_mandatory: boolean;
  input_validation_type: string;
  format_type: string;
  date_format_type: string;
  input_type: string;
  attribute_unit: string[];
  attribute_value_list: AttributeValue[];
}

interface AttributeValues {
  attribute_list: AttributeValue[];
}

interface Brand {
  brand_id: number;
  original_brand_name: string;
  display_brand_name: string;
}

interface ResponseGetBrandList extends ShopeeResponseCommon<Brand> {
  brand_list: Brand[];
  has_next_page: boolean;
  next_offset: number;
  is_mandatory: boolean;
  input_type: string;
}

interface UpdatePrice {
  failure_list: Array<any>;
  success_list: Array<any>;
}

type ResponseUnlistItem = ShopeeResponseCommon<UnlistItem>;
type ResponseUpdateStock = ShopeeResponseCommon<UpdateStock>;
type ResponseGetItemList = ShopeeResponseCommon<ItemList>;
type ResponseProductBaseItemInfo = ShopeeResponseCommon<ProductBaseItemInfo>;
type ResponseGetCategories = ShopeeResponseCommon<Categories>;
type ResponseGetAttributes = ShopeeResponseCommon<AttributeValues>;
type ResponseUpdatePrice = ShopeeResponseCommon<UpdatePrice>;

export {
  ResponseComment as ShopeeResponseComment,
  ResponseGetModelList as ShopeeResponseGetModelList,
  ResponseUnlistItem as ShopeeResponseUnlistItem,
  ResponseUpdateStock as ShopeeResponseUpdateStock,
  ResponseGetItemList as ShopeeResponseGetItemList,
  ResponseProductBaseItemInfo as ShopeeResponseProductBaseItemInfo,
  ResponseGetCategories as ShopeeResponseGetCategories,
  ResponseGetAttributes as ShopeeResponseGetAttributes,
  ResponseGetBrandList as ShopeeResponseGetBrandList,
  ResponseUpdatePrice as ShopeeResponseUpdatePrice,
};
