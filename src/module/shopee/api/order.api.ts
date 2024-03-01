import axios from 'axios';
import { SHOPEE_END_POINT, SHOPEE_PATH } from '../common/constant';
import { ShopeeConfig } from '../dto/request/config.request';
import { createHmac } from 'crypto';
import {
  buildCommonParameters,
  commonParameter,
  getTimestampMinutesAgo,
  getTimestampNow,
  signRequest,
} from '../common/helper';

/**
 *
 * @param beforeMinutes
 * @param config
 * @returns
 */

const END_POINT = SHOPEE_END_POINT;

export async function getOrders(beforeMinutes: number, config) {
  let cursor = '';
  const orderList: string[] = [];
  let hasMoreData = true;
  const timeFrom = getTimestampMinutesAgo(beforeMinutes);

  while (hasMoreData) {
    const timestamp = getTimestampNow();
    const signature = signRequest(SHOPEE_PATH.ORDER_LIST, config, timestamp);
    const commonParams = buildCommonParameters(
      config,
      signature,
      timestamp,
      timeFrom,
      cursor,
    );

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
export async function getOrderDetail(
  orderNumber: string,
  config: ShopeeConfig,
) {
  const timestamp = Math.floor(Date.now() / 1000);
  const optionalField: string[] = [
    `buyer_user_id,buyer_username,estimated_shipping_fee,recipient_address,
    actual_shipping_fee,goods_to_declare,note,note_update_time,item_list,
    pay_time,dropshipper,dropshipper_phone,split_up,buyer_cancel_reason,cancel_by,
    cancel_reason,actual_shipping_fee_confirmed,buyer_cpf_id,fulfillment_flag,pickup_done_time,
    package_list,shipping_carrier,payment_method,total_amount,buyer_username,invoice_data, 
    checkout_shipping_carrier, reverse_shipping_fee, order_chargeable_weight_gram`,
  ];
  const signature = signRequest(SHOPEE_PATH.ORDER_DETAIL, config, timestamp);
  const commonParam =
    commonParameter(config, signature, timestamp) +
    '&order_sn_list=' +
    orderNumber +
    '&response_optional_fields=' +
    optionalField.toString();

  const url = END_POINT + SHOPEE_PATH.ORDER_DETAIL + commonParam;
  const res = await axios.get(url);

  return res.data;
}

export async function fetchTokenWithAuthCode(
  authCode: string,
  config: ShopeeConfig,
) {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const { partnerId, shopId, partnerKey } = config;
    const params = [partnerId, SHOPEE_PATH.AUTH_TOKEN, timestamp.toString()];
    const baseString = params.reduce((prev, curr) => (prev += curr), '');
    const signature = createHmac('sha256', partnerKey)
      .update(baseString)
      .digest('hex');

    const commonParam =
      '?sign=' +
      signature +
      '&partner_id=' +
      partnerId +
      '&timestamp=' +
      timestamp;
    const body = {
      code: authCode,
      partner_id: parseInt(partnerId),
      shop_id: parseInt(shopId),
    };
    const url = END_POINT + SHOPEE_PATH.AUTH_TOKEN + commonParam;

    const res = await axios.post(url, body);
    return res.data;
  } catch (error) {}
}
