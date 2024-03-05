import axios from 'axios';
import { SHOPEE_END_POINT, SHOPEE_PATH } from '../common/constant';
import { ShopeeConfig } from '../dto/request/config.request';
import { createHmac } from 'crypto';
import * as ShopeeHelper from '../common/helper';
import { ShopeeResponseOrderDetail } from '../dto/response/order.response';

const END_POINT = SHOPEE_END_POINT;

/**
 * Get orders
 * @param beforeMinutes
 * @param config
 * @returns
 */
export async function getOrders(beforeMinutes: number, config: ShopeeConfig) {
  let cursor = '';
  const orderList: string[] = [];
  let hasMoreData = true;
  const timeFrom = ShopeeHelper.getTimestampMinutesAgo(beforeMinutes);

  while (hasMoreData) {
    const timestamp = ShopeeHelper.getTimestampNow();
    const signature = ShopeeHelper.signRequest(SHOPEE_PATH.ORDER_LIST, config, timestamp);
    const commonParams = ShopeeHelper.buildCommonParameters(config, signature, timestamp, timeFrom, cursor);

    const url = `${END_POINT}${SHOPEE_PATH.ORDER_LIST}${commonParams}`;
    const res = await axios.get(url);
    if (res.data?.respone?.order_list.length < 1) break;
    orderList.push(...res.data.response.order_list);

    cursor = res.data.response.next_cursor;
    hasMoreData = res.data.response.more;
  }

  return orderList.map((item: any) => item.order_sn);
}

/**
 *
 * @param orderNumber
 * @param config
 * @returns
 */
export async function getOrderDetail(orderNumber: string, config: ShopeeConfig): Promise<ShopeeResponseOrderDetail> {
  const timestamp = ShopeeHelper.getTimestampNow();
  const optionalField = ShopeeHelper.optionalField();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.ORDER_DETAIL, config, timestamp);
  const commonParam = `${ShopeeHelper.commonParameter(config, signature, timestamp)}&order_sn_list=${orderNumber}&response_optional_fields=${optionalField.join(',')}`;
  const url = END_POINT + SHOPEE_PATH.ORDER_DETAIL + commonParam;

  return ShopeeHelper.httpGet(url, config);
}

/**
 * Fetch token with auth code
 * @param authCode
 * @param config
 * @returns
 */
export async function fetchTokenWithAuthCode(authCode: string, config: ShopeeConfig): Promise<any> {
  const { partnerId, shopId, partnerKey } = config;
  const timestamp = ShopeeHelper.getTimestampNow();
  const params = [partnerId, SHOPEE_PATH.AUTH_TOKEN, timestamp.toString()];
  const baseString = params.reduce((prev, curr) => (prev += curr), '');
  const signature = createHmac('sha256', partnerKey).update(baseString).digest('hex');

  const commonParam = `?sign=${signature}&partner_id=${partnerId}&timestamp=${timestamp}`;
  const body = {
    code: authCode,
    partner_id: parseInt(partnerId),
    shop_id: parseInt(shopId),
  };
  const url = `${END_POINT}${SHOPEE_PATH.AUTH_TOKEN}${commonParam}`;
  const headers = ShopeeHelper.getHeaders(config);
  return ShopeeHelper.httpPost(url, body, headers);
}
