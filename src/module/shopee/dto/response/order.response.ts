import { ShopeeResponseCommon } from './config.response';

interface OrderList {
  more: boolean;
  order_list: Array<any>;
  next_cursor: string;
}

interface OrderDetail {
  order_list: Array<any>;
}

interface EscrowDetail {
  order_sn: string;
  buyer_user_name: string;
  return_order_sn_list: string[];
  order_income: any;
}

interface ReturnDetail {
  image: Array<string>;
  buyer_videos: any;
  reason: string;
  text_reason: string;
  return_sn: string;
  refund_amount: number;
  currency: string;
  create_time: number;
  update_time: number;
  status: string;
  due_date: number;
  tracking_number: string;
  needs_logistics: true;
  amount_before_discount: number;
  user: {
    username: string;
    email: string;
    portrait: string;
  };
  item: any;
  order_sn: string;
  return_ship_due_date: number;
  return_seller_due_date: number;
  activity: [];
  seller_proof: {
    seller_proof_status: string;
    seller_evidence_deadline: any;
  };
  seller_compensation: {
    seller_compensation_status: string;
    seller_compensation_due_date: any;
    compensation_amount: any;
  };
  negotiation: {
    negotiation_status: string;
    latest_solution: string;
    latest_offer_amount: any;
    latest_offer_creator: string;
    counter_limit: any;
    offer_due_date: any;
  };
  logistics_status: string;
  return_pickup_address: {
    address: string;
    name: string;
    phone: string;
    town: string;
    district: string;
    city: string;
    state: string;
    region: string;
    zipcode: string;
  };
}

interface ResponseOrderList extends ShopeeResponseCommon<OrderList> {}
interface ResponseOrderDetail extends ShopeeResponseCommon<OrderDetail> {}
interface ResponseEscrowDetail extends ShopeeResponseCommon<EscrowDetail> {}
interface ResponseReturnDetail extends ShopeeResponseCommon<ReturnDetail> {}

export {
  ResponseOrderList as ShopeeResponseOrderList,
  ResponseOrderDetail as ShopeeResponseOrderDetail,
  ResponseEscrowDetail as ShopeeResponseEscrowDetail,
  ResponseReturnDetail as ShopeeResponseReturnDetail,
};
