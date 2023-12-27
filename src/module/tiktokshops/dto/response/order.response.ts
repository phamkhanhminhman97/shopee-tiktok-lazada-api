import { TiktokResponseCommon } from "./config.response";

interface ResponseShipOrder extends TiktokResponseCommon {
  request_id: string;
}

interface RecipentAddress {
  full_address: string;
  phone: string;
  name: string;
  zipcode: string;
  address_detail;
  region_code: string;
  region: string;
  city: string;
  district: string;
  town: string;
  addressline1: string;
  addressline2: string;
  addressline3: string;
  addressline4: string;
}

interface PaymentInfo {
  currency: string;
  original_shipping_fee: number;
  original_total_product_price: number;
  platform_discount: number;
  seller_discount: number;
  shipping_fee: number;
  shipping_fee_platform_discount: number;
  shipping_fee_seller_discount: number;
  sub_total: number;
  taxes: number;
  total_amount: number;
}

interface ResponseOrderDetail {
  order_id: string;
  order_status: number;
  shipping_provider: string;
  shipping_provider_id: string;
  create_time: string;
  paid_time: number;
  buyer_message: string;
  payment_info: PaymentInfo;
  recipient_address: RecipentAddress;
  cancel_reason: string;
  cancel_user: string;
  tracking_number: string;
  rts_time: number; //The time merchants shipped order(call ShipOrder successfully).
  rts_sla: number; //The latest shipping time specified by the platform.
  tts_sla: number; //The latest collection time specified by the platform.
  cancel_order_sla: number; //The automatic cancellation time for orders specified by the platform.
  update_time: number; //Time of order status changes.
  package_list: Array<any>;
  receiver_address_updated?: number; //0:no update, 1:updated;
  buyer_uid: string;
  split_or_combine_tag?: string;
  fulfillment_type: number; // Only orders with fulfillment type = 0 can be shipped by merchants.
  seller_note?: string;
  warehouse_id: string;
  payment_method: string;
  payment_method_type: number;
  payment_method_name: string;
  delivery_option_type?: number; //PLATFORM=1 (platform logistics mode), SELLER=2 (merchant self-shipping mode)
  delivery_option_description?: string;
  delivery_option_id?: string;
  delivery_sla?: number; //Delivery SLA time
  is_cod?: boolean;
  need_upload_invoice?: number; //unknown=0, need=1, no need =2
  order_line_list: Array<any>;
  cpf?: string;
  district_info_list?: Array<any>;
  item_list: Array<any>;
}

// interface ResponseOrderDetail extends TiktokResponseCommon {
//   data: {
//     order_list: Array<OrderDetail>;
//   };
// }

export {
  ResponseShipOrder as TiktokResponseShipOrder,
  ResponseOrderDetail as TiktokResponseOrderDetail,
};
