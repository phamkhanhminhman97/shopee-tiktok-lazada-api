interface Rating {
  seller_rating?: number;
  overall_rating?: number;
  logistics_rating?: number;
  product_rating?: number;
}

interface Skus {
  Status: string;
  quantity: number;
  Images: Array<any>;
  SellerSku: string;
  ShopSku: string;
  special_time_format: string;
  saleProp: any;
  Url: string;
  multiWarehouseInventories: any;
  package_width: string;
  special_to_time: string;
  special_from_time: string;
  package_height: string;
  fblWarehouseInventories: Array<any>;
  special_price: number;
  price: number;
  channelInventories: Array<any>;
  package_length: string;
  special_from_date: string;
  package_weight: string;
  SkuId: number;
  special_to_date: string;
}

interface ResponseProductItem {
  created_time: string;
  updated_time: string;
  images: Array<string>;
  skus: Array<Skus>;
  item_id: number;
  trialProduct: boolean;
  primary_category: number;
  marketImages: Array<any>;
  attributes: {
    name: string;
    description: string;
    brand: string;
    mask_type: string;
    ingredient_preference: string;
    Hazmat: string;
    source: string;
    delivery_option_sof: string;
  };
  status: string;
}

class ResponseReview {
  review_images?: any;
  can_reply?: boolean;
  create_time?: any;
  submit_time?: any;
  review_content?: string;
  ratings?: Rating;
  product_id: any;
  id: any;
  seller_reply?: string;
  order_id?: number;
  review_type?: string;
}

export {
  ResponseReview as LazadaResponseReview,
  ResponseProductItem as LazadaResponseProductItem,
};
