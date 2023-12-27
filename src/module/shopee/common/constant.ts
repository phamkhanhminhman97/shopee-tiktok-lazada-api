enum LOGISTICS_STATUS {
  LOGISTICS_NOT_STARTED = "LOGISTICS_NOT_STARTED", //Initial status, order not ready for fulfillment
  LOGISTICS_REQUEST_CREATED = "LOGISTICS_REQUEST_CREATED", //order arranged shipment
  LOGISTICS_PICKUP_DONE = "LOGISTICS_PICKUP_DONE", //order handed over to 3PL
  LOGISTICS_PICKUP_RETRY = "LOGISTICS_PICKUP_RETRY", //order pending 3PL retry pickup
  LOGISTICS_PICKUP_FAILED = "LOGISTICS_PICKUP_FAILED", //order cancelled by 3PL due to failed pickup or picked up but not able to proceed with delivery
  LOGISTICS_DELIVERY_DONE = "LOGISTICS_DELIVERY_DONE", //order successfully delivered
  LOGISTICS_DELIVERY_FAILED = "LOGISTICS_DELIVERY_FAILED", //order cancelled due to 3PL delivery failed
  LOGISTICS_REQUEST_CANCELED = "LOGISTICS_REQUEST_CANCELED", //order cancelled when order at LOGISTICS_REQUEST_CREATED
  LOGISTICS_COD_REJECTED = "LOGISTICS_COD_REJECTED", //Integrated logistics COD: Order rejected for COD
  LOGISTICS_READY = "LOGISTICS_READY", //order ready for fulfilment from payment perspective:non-COD: order paidCOD: order passed COD screening
  LOGISTICS_INVALID = "LOGISTICS_INVALID", //order cancelled when order at LOGISTICS_READY
  LOGISTICS_LOST = "LOGISTICS_LOST", //order cancelled due to 3PL lost the order
  LOGISTICS_PENDING_ARRANGE = "LOGISTICS_PENDING_ARRANGE", //order logistics pending arrangement
}

enum ORDER_STATUS {
  UNPAID = "UNPAID", //Order is created, buyer has not paid yet.
  PENDING = "PENDING",
  READY_TO_SHIP = "READY_TO_SHIP", //Seller can arrange shipment.
  PROCESSED = "PROCESSED", //Seller has arranged shipment online and got tracking number from 3PL.
  SHIPPED = "SHIPPED", //The parcel has been drop to 3PL or picked up by 3PL.
  TO_CONFIRM_RECEIVE = "TO_CONFIRM_RECEIVE", //The order has been received by buyer.
  COMPLETED = "COMPLETED", //The order has been completed.
  IN_CANCEL = "IN_CANCEL", //The order's cancelation is under processing.
  CANCELLED = "CANCELLED", //The order has been canceled.
  INVOICE_PENDING = "INVOICE_PENDING",
  RETRY_SHIP = "RETRY_SHIP", //3PL pickup parcel fail. Need to re arrange shipment.
}

enum RETURN_STATUS {
  REQUESTED = "REQUESTED",
  ACCEPTED = "ACCEPTED",
  CANCELLED = "CANCELLED",
  JUDGING = "JUDGING",
  REFUND_PAID = "REFUND_PAID",
  CLOSED = "CLOSED",
  PROCESSING = "PROCESSING",
  SELLER_DISPUTE = "SELLER_DISPUTE",
}

enum RETURN_SOLUTION {
  RETURN_REFUND = "RETURN_REFUND",
  REFUND = "REFUND",
}

enum SHIPPING_DOCUMENT_TYPE {
  THERMAL_AIR_WAYBILL = "THERMAL_AIR_WAYBILL",
  NORMAL_AIR_WAYBILL = "NORMAL_AIR_WAYBILL",
}

enum STATUS_SHIPPING_DOCUMENT {
  FAILED = "FAILED",
  READY = "READY",
  PROCESSING = "PROCESSING",
}

const ALGORITHM = "sha256";
const DIGEST = "hex";

const MAX_PAGE_SIZE = 100;
const END_POINT = "https://partner.shopeemobile.com";
const END_POINT_SANDBOX = "https://partner.test-stable.shopeemobile.com";

enum PATH {
  ADD_ITEM = "/api/v2/product/add_item",
  ORDER_LIST = "/api/v2/order/get_order_list",
  ORDER_DETAIL = "/api/v2/order/get_order_detail",
  SHIPPING_PARAMS = "/api/v2/logistics/get_shipping_parameter",
  SHIP_ORDER = "/api/v2/logistics/ship_order",
  ADDRESS_LIST = "/api/v2/logistics/get_address_list",
  AUTH_TOKEN = "/api/v2/auth/token/get",
  REFRESH_TOKEN = "/api/v2/auth/access_token/get",
  GET_SHIPPING_DOCUMENTS = "/api/v2/logistics/get_shipping_document_result",
  CREATE_SHIPPING_DOCUMENTS = "/api/v2/logistics/create_shipping_document",
  TRACKING_NUMBER = "/api/v2/logistics/get_tracking_number",
  TRACKING_INFO = "/api/v2/logistics/get_tracking_info",
  DOWNLOAD_SHIPPING_DOCUMENT = "/api/v2/logistics/download_shipping_document",
  GET_SHIPPING_INFO = "/api/v2/logistics/get_shipping_document_data_info",
  GENERATE_AUTH_LINK = "/api/v2/shop/auth_partner",
  CHANNEL_LIST = "/api/v2/logistics/get_channel_list",
  GET_ITEM_LIST = "/api/v2/product/get_item_list",
  GET_ITEM_BASE = "/api/v2/product/get_item_base_info",
  GET_MODEL_LIST = "/api/v2/product/get_model_list",
  UPDATE_STOCK = "/api/v2/product/update_stock",
  UPDATE_PRICE = "/api/v2/product/update_price",
  GET_BUNDLE = "/api/v2/bundle_deal/get_bundle_deal",
  GET_ESCROW = "/api/v2/payment/get_escrow_detail",
  UNLIST_ITEM = "/api/v2/product/unlist_item",
  SEARCH_ITEM = "/api/v2/product/search_item",
  RETURN_DETAIL = "/api/v2/returns/get_return_detail",
  RETURN_LIST = "/api/v2/returns/get_return_list",
  RETURN_SOLUTION = "/api/v2/returns/get_available_solutions",
  RETURN_CONFIRM = "/api/v2/returns/confirm",
  GET_COMMENTS = "/api/v2/product/get_comment",
}

export {
  LOGISTICS_STATUS as SHOPEE_LOGISTICS_STATUS,
  ORDER_STATUS as SHOPEE_ORDER_STATUS,
  RETURN_STATUS as SHOPEE_RETURN_STATUS,
  RETURN_SOLUTION as SHOPEE_RETURN_SOLUTION,
  SHIPPING_DOCUMENT_TYPE as SHOPEE_SHIPPING_DOCUMENT_TYPE,
  STATUS_SHIPPING_DOCUMENT as SHOPEE_STATUS_SHIPPING_DOCUMENT,
  PATH as SHOPEE_PATH,
  ALGORITHM as SHOPEE_ALGORITHM,
  DIGEST as SHOPEE_DIGEST,
  MAX_PAGE_SIZE as SHOPEE_MAX_PAGE_SIZE,
  END_POINT as SHOPEE_END_POINT,
  END_POINT_SANDBOX as SHOPEE_END_POINT_SANDBOX,
};
