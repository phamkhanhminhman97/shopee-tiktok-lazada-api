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
  original_shipping_fee: string; //Shipping fee before discount
  original_total_product_price: string; //Total original price of products.
  platform_discount: string;
  seller_discount: string;
  shipping_fee: string; //Buyer paid shipping fee. Shipping_fee = original_shipping_fee - shipping_fee_seller_discount - shipping_fee_platform_discount
  shipping_fee_platform_discount: string;
  shipping_fee_seller_discount: string;
  sub_total: string; //sub_total = original_total_product_price - seller_discount - platform_discount
  tax: string;
  total_amount: string; //total_amount=sub_total+shipping_fee+taxes+retail_delivery_fee.
}

interface ResponseOrderDetail {
  id: string;
  status: string;
  is_cod?: boolean;
  has_updated_recipient_address: boolean;
  shipping_provider: string;
  shipping_provider_id: string;
  create_time: number; //The date and time that the order was created. Unix timestamp for second.
  paid_time: number; //The date and time that the order was paid. Unix timestamp for second.
  cancel_order_sla_time: number; //The automatic cancellation time for orders specified by the platform.
  collection_due_time: number; //	If the order hasn't updated its status to "IN_TRANSIT" before this time, the order will be canceled by TikTok Shop
  shipping_due_time: number; //If the order hasn't updated its status to "AWAITING_COLLECTION" before this time, the order will be canceled by TikTok Shop.
  delivery_due_time: number; //If the order hasn't updated its status to "DELIVERED" before this time, the order will be canceled by TikTok Shop
  collection_time: number; //The timestamp of the order's status update to "IN_TRANSIT".
  delivery_time: number; //The timestamp of the order's status update to "DELIVERED".
  cancel_time: number; //The timestamp of the order's status update to "CANCELLED".
  tracking_number: string; //Tracking number. Available after ship pacakge.
  rts_time: number; //The time seller shipped order(call ShipOrder successfully).
  rts_sla: number; //The latest shipping time specified by the platform.
  tts_sla: number; //The latest collection time specified by the platform.
  cancel_order_sla: number; //The automatic cancellation time for orders specified by the platform.
  update_time: number; //Time of order status changes.
  rts_sla_time: number; //The latest shipping time specified by the platform. Unix timestamp.
  tts_sla_time: number; //The latest collection time specified by the platform.
  request_cancel_time: number; //Buyer request cancel time
  delivery_sla?: number; //Delivery SLA time
  is_buyer_request_cancel: boolean; //True when the buyer has a pending cancellation request
  buyer_message: string;
  buyer_email: string;
  payment_info: PaymentInfo;
  recipient_address: RecipentAddress;
  cancel_reason: string;
  cancellation_initiator: string; // SELLER/BUYER/SYSTEM
  cancel_user: string;
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
  delivery_option_name: string;
  is_on_hold_order: boolean;
  is_sample_order: boolean;
  line_items: Array<any>;
  packages: Array<any>;
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
