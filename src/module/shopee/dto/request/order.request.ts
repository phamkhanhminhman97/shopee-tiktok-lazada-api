import { ShopeeRequestCommon } from './config.request';

interface RequestOrderDetail extends ShopeeRequestCommon {
  order_sn_list: string[];
  response_optional_fields?: string[];
  request_order_status_pending?: boolean;
}

interface RequestOrderList extends ShopeeRequestCommon {
  time_range_field: string; //Available value: create_time, update_time.
  time_from: number; //The maximum date range that may be specified with the time_from and time_to fields is 15 days.
  time_to: number;
  page_size: number; //The limit of page_size if between 1 and 100.
  cursor?: string; //Default is "". If data is more than one page, the offset can be some entry to start next call.
  order_status?: string; //Available value: UNPAID/READY_TO_SHIP/PROCESSED/SHIPPED/COMPLETED/IN_CANCEL/CANCELLED/INVOICE_PENDING
  response_optional_fields?: string; //Available value: order_status.
  request_order_status_pending?: boolean; //send True will let API support PENDING status, send False or don’t send will fallback to old logic.
}

interface RequestEscrowDetail extends ShopeeRequestCommon {
  order_sn: string;
}

export {
  RequestOrderDetail as ShopeeRequestOrderDetail,
  RequestOrderList as ShopeeRequestOrderList,
  RequestEscrowDetail as ShopeeRequestEscrowDetail,
};
