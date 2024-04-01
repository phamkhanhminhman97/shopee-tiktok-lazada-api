import { LAZADA_PATH, LZD_ALGORITHM } from '../common/constant';
import * as LazadaHelper from '../common/helper';

/**
 *
 * @param info
 * @param order_id
 * @returns
 */
export async function getOrderById(info, order_id: string) {
  const obj = {
    order_id,
    app_key: info.appKey,
    sign_method: LZD_ALGORITHM,
    timestamp: LazadaHelper.getTimestampMilisec(),
    access_token: info.appAccessToken,
  };
  return LazadaHelper.httpGet(LAZADA_PATH.SINGLE_ORDER_GET, obj, info.appSecret);
}

export async function getOrdersBeforeSomeDay(info, offset = 1, limit = 100) {
  const fifteenDaysAgo = new Date();
  fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 1);
  fifteenDaysAgo.setHours(0, 0, 0, 0);
  const obj = {
    offset,
    limit,
    app_key: info.appKey,
    sign_method: LZD_ALGORITHM,
    timestamp: LazadaHelper.getTimestampMilisec(),
    access_token: info.appAccessToken,
    update_after: fifteenDaysAgo.toISOString(),
  };
  return LazadaHelper.httpGet(LAZADA_PATH.ORDERS_GET, obj, info.appSecret);
}
