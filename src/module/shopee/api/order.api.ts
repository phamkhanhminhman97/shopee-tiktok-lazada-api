import { SHOPEE_END_POINT, SHOPEE_PATH } from '../common/constant';
import { ShopeeConfig } from '../dto/request/config.request';
import * as ShopeeHelper from '../common/helper';
import { ShopeeResponseOrderDetail } from '../dto/response/order.response';

/**
 * Get orders
 * @param beforeMinutes
 * @param config
 * @returns Array of order_sn
 */
export async function getOrders(beforeMinutes: number, config: ShopeeConfig): Promise<string[]> {
  // Shopee API restricts time range to 15 days max
  const FIFTEEN_DAYS_IN_MINUTES = 15 * 24 * 60;
  if (beforeMinutes > FIFTEEN_DAYS_IN_MINUTES) {
    throw new Error(`[Shopee API] The maximum date range is 15 days (${FIFTEEN_DAYS_IN_MINUTES} minutes). Please reduce beforeMinutes.`);
  }

  let cursor = '';
  const orderList: { order_sn: string }[] = [];
  let hasMoreData = true;
  
  // time_from and time_to MUST be constant during pagination to prevent data shifting
  const timeFrom = ShopeeHelper.getTimestampMinutesAgo(beforeMinutes);
  const timeTo = ShopeeHelper.getTimestampNow();

  while (hasMoreData) {
    // Current timestamp for request signature
    const requestTimestamp = ShopeeHelper.getTimestampNow();
    const signature = ShopeeHelper.signRequest(SHOPEE_PATH.ORDER_LIST, config, requestTimestamp);
    
    const additionalParams = {
      time_range_field: 'create_time',
      time_from: timeFrom,
      time_to: timeTo,
      page_size: 100, // Maximum page_size allowed by API to reduce HTTP calls
      cursor: cursor,
    };

    const commonParams = ShopeeHelper.buildCommonParams(config, signature, requestTimestamp, additionalParams);
    const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.ORDER_LIST}${commonParams}`;

    const res: any = await ShopeeHelper.httpGet(url, config);

    // Handle API Error explicitly instead of silently failing
    if (res?.error) {
      throw new Error(`[Shopee API Error - getOrders] ${res.error}: ${res.message}`);
    }

    // Break gracefully if no data
    if (!res?.response?.order_list || res.response.order_list.length === 0) {
      break;
    }
    
    orderList.push(...res.response.order_list);

    cursor = res.response.next_cursor || '';
    hasMoreData = Boolean(res.response.more);
  }

  return orderList.map(item => item.order_sn);
}

/**
 * Get order detail
 * @param orderSnList - Single order_sn or an array of order_sn. Max 50.
 * @param config
 * @returns ShopeeResponseOrderDetail
 */
export async function getOrderDetail(orderSnList: string | string[], config: ShopeeConfig): Promise<ShopeeResponseOrderDetail> {
  const timestamp = ShopeeHelper.getTimestampNow();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.ORDER_DETAIL, config, timestamp);
  
  const orderSns = Array.isArray(orderSnList) ? orderSnList.join(',') : orderSnList;
  
  // API Limit validation: max 50 orders per request
  const snCount = orderSns.split(',').length;
  if (snCount > 50) {
    throw new Error(`[Shopee API] The maximum limit for order_sn_list is 50. You provided ${snCount} orders.`);
  }

  // Get base optional fields from helper and ensure new fields from latest doc are included
  const optionalField = ShopeeHelper.optionalField();
  const newFields = ['return_request_due_date', 'edt', 'payment_info', 'international_label'];
  const allOptionalFields = Array.from(new Set([...optionalField, ...newFields]));

  const additionalParams = {
    order_sn_list: orderSns,
    response_optional_fields: allOptionalFields.join(','),
    request_order_status_pending: true, // Enable new logic to support PENDING status and return pending_terms
  };

  const commonParam = ShopeeHelper.buildCommonParams(config, signature, timestamp, additionalParams);
  const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.ORDER_DETAIL}${commonParam}`;

  const res: any = await ShopeeHelper.httpGet(url, config);

  // Handle API Error explicitly
  if (res?.error) {
    throw new Error(`[Shopee API Error - getOrderDetail] ${res.error}: ${res.message}`);
  }

  return res;
}

/**
 * Get shipment list (Orders with status READY_TO_SHIP or RETRY_SHIP)
 * @param config ShopeeConfig
 * @returns Array of { order_sn, package_number }
 */
export async function getShipmentList(config: ShopeeConfig): Promise<{ order_sn: string; package_number: string }[]> {
  let cursor = '';
  const shipmentList: { order_sn: string; package_number: string }[] = [];
  let hasMoreData = true;

  while (hasMoreData) {
    const requestTimestamp = ShopeeHelper.getTimestampNow();
    const signature = ShopeeHelper.signRequest(SHOPEE_PATH.GET_SHIPMENT_LIST, config, requestTimestamp);

    const additionalParams = {
      page_size: 100, // API allows up to 100
      cursor: cursor,
    };

    const commonParams = ShopeeHelper.buildCommonParams(config, signature, requestTimestamp, additionalParams);
    const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.GET_SHIPMENT_LIST}${commonParams}`;

    const res: any = await ShopeeHelper.httpGet(url, config);

    // Handle API Error explicitly
    if (res?.error) {
      throw new Error(`[Shopee API Error - getShipmentList] ${res.error}: ${res.message}`);
    }

    if (!res?.response?.order_list || res.response.order_list.length === 0) {
      break;
    }

    shipmentList.push(...res.response.order_list);

    cursor = res.response.next_cursor || '';
    hasMoreData = Boolean(res.response.more);
  }

  return shipmentList.map(item => ({
    order_sn: item.order_sn,
    package_number: item.package_number,
  }));
}
