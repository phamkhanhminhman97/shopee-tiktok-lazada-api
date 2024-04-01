enum PRODUCT_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DELETED = 'deleted',
}

enum REVERSE_STATUS {
  REQUEST_INITIATE = 'REQUEST_INITIATE',
  REQUEST_REJECT = 'REQUEST_REJECT',
  REQUEST_CANCEL = 'REQUEST_CANCEL',
  CANCEL_SUCCESS = 'CANCEL_SUCCESS',
  REFUND_PENDING = 'REFUND_PENDING',
  REFUND_AUTHORIZED = 'REFUND_AUTHORIZED',
  REFUND_SUCCESS = 'REFUND_SUCCESS',
  REFUND_REJECT = 'REFUND_REJECT',
  REQUEST_COMPLETE = 'REQUEST_COMPLETE',
  SELLER_AGREE_RETURN = 'SELLER_AGREE_RETURN',
  SELLER_REJECT_RETURN = 'SELLER_REJECT_RETURN',
  BUYER_RETURN_ITEM = 'BUYER_RETURN_ITEM',
  SELLER_AGREE_REFUND = 'SELLER_AGREE_REFUND',
  SELLER_REJECT_REFUND = 'SELLER_REJECT_REFUND',
  CS_APPROVING = 'CS_APPROVING',
  AGREE_CANCEL_ORDER = 'AGREE_CANCEL_ORDER',
  REJECT_CANCEL_ORDER = 'REJECT_CANCEL_ORDER',
}

enum ORDER_STATUS {
  UNPAID = 'UNPAID',
  PENDING = 'PENDING',
  PACKED = 'PACKED',
  READY_TO_SHIP = 'READY_TO_SHIP',
  READY_TO_SHIP_PENDING = 'READY_TO_SHIP_PENDING',
  SHIPPED = 'SHIPPED',
  FAILED_DELIVERY = 'FAILED_DELIVERY',
  DELIVERED = 'DELIVERED',
  CONFIRMED = 'CONFIRMED',
  LOST_BY_3PL = 'LOST_BY_3PL',
  DAMAGED_BY_3PL = 'DAMAGED_BY_3PL',
  RETURNED = 'RETURNED',
  CANCELED = 'CANCELED',
  SHIPPED_BACK = 'SHIPPED_BACK',
  SHIPPED_BACK_SUCCESS = 'SHIPPED_BACK_SUCCESS',
  SHIPPED_BACK_FAILED = 'SHIPPED_BACK_FAILED',
  PACKED_SCRAPPED = 'PACKED_SCRAPPED',
}

enum WEBHOOK_TYPE {
  ORDER = 0,
  AUTH_EXPIRE = 8,
  REVERSE = 10,
  FULFILLMENT = 14,
  PRODUCT = 21,
}

const BUYER_USERNAME = 'Khách hàng đánh giá';
const MAX_RANGE_CAN_BE_REVIEW = 12; //WEEK
const TIME_RANGE_EXCEED = 7; //DAYS
const END_POINT = 'https://api.lazada.vn/rest';
const END_POINT_AUTH = 'https://auth.lazada.com/oauth/authorize';
const ALGORITHM = 'sha256';
const DIGEST = 'hex';
const DROP_SHIP = 'dropship';

enum PATH {
  PRODUCT_GET = '/products/get',
  UPDATE_SELLABLE_QUANTITY = '/product/stock/sellable/update',
  UPDATE_PRICE = '/product/price_quantity/update',
  ORDERS_GET = '/orders/get',
  SINGLE_ORDER_GET = '/order/get',
  SINGLE_ORDER_ITEM_GET = '/order/items/get',
  PRODUCT_ITEM_GET = '/product/item/get',
  SET_STATUS_TO_PACKED_BY_MARKETPLACE = '/order/pack',
  REVERSE_LIST = '/reverse/getreverseordersforseller',
  REVERSE_DETAIL = '/order/reverse/return/detail/list',
  SHIPPING_LABEL_GET = '/order/document/awb/pdf/get',
  SHIPPING_LABEL_V2 = '/order/package/document/get',
  STREAM_S3 = '/stream-s3',
  FULFILL_PACK = '/order/fulfill/pack',
  SHIPMENT_PROVIDERS = '/order/shipment/providers/get',
  READY_TO_SHIP = '/order/package/rts',
  HISTORY_REVIEW = '/review/seller/history/list',
  REVIEW_LIST = '/review/seller/list/v2',
  UPDATE_PRODUCT = '/product/update',
  TRACE_ORDER = '/logistic/order/trace',
  FETCH_TOKEN = '/auth/token/create',
  REFRESH_TOKEN = '/auth/token/refresh',
}

export {
  PRODUCT_STATUS as LAZADA_PRODUCT_STATUS,
  REVERSE_STATUS as LAZADA_REVERSE_STATUS,
  ORDER_STATUS as LAZADA_ORDER_STATUS,
  PATH as LAZADA_PATH,
  WEBHOOK_TYPE as LAZADA_WEBHOOK_TYPE,
  END_POINT as LZD_END_POINT,
  END_POINT_AUTH as LZD_END_POINT_AUTH,
  ALGORITHM as LZD_ALGORITHM,
  DIGEST as LZD_DIGEST,
  DROP_SHIP as LZD_DROP_SHIP,
  BUYER_USERNAME as LZD_BUYER_USERNAME,
  TIME_RANGE_EXCEED as LZD_TIME_RANGE_EXCEED,
  MAX_RANGE_CAN_BE_REVIEW as LZD_MAX_RANGE_CAN_BE_REVIEW,
};
