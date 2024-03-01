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

interface Item {
  item_id: number;
  item_status: string;
  update_time: number;
}

interface ItemList {
  item: Array<Item>;
  total_count: number;
  has_next_page: boolean;
  next_offset: number;
}

interface ResponseGetItemList extends ShopeeResponseCommon<ItemList> {}

interface SellerStock {
  location_id: string;
  stock: number;
}

interface StockInfoV2 {
  summary_info: {
    total_reserved_stock: number;
    total_available_stock: number;
  };
  seller_stock: Array<SellerStock>;
  shopee_stock: Array<SellerStock>;
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
interface ResponseGetModelList extends ShopeeResponseCommon<ModelList> {}

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

interface ResponseUnlistItem extends ShopeeResponseCommon<UnlistItem> {}
interface ResponseUpdateStock extends ShopeeResponseCommon<UpdateStock> {
  warning: string;
}

export {
  ResponseComment as ShopeeResponseComment,
  ResponseGetModelList as ShopeeResponseGetModelList,
  ResponseUnlistItem as ShopeeResponseUnlistItem,
  ResponseUpdateStock as ShopeeResponseUpdateStock,
  ResponseGetItemList as ShopeeResponseGetItemList,
};
