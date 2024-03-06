import * as ShopeeHelper from '../common/helper';
import { SHOPEE_END_POINT, SHOPEE_PATH } from '../common/constant';
import { ShopeeConfig } from '../dto/request/config.request';
import {
  ShopeeResponseLogisticChannelList,
  ShopeeResponseShipOrder,
  ShopeeResponseShippingParameter,
} from '../dto/response/logistic.reponse';
import { ShopeeRequestShipOrder } from '../dto/request/logistic.request';

/**
 *
 * @param itemIds - Product IDs.
 * @param statusUnlist - Unlist status.
 * @param config - Shopee API configuration.
 * @returns {Promise<ShopeeResponseGetCategories>}
 */
export async function getChannelList(config: ShopeeConfig): Promise<ShopeeResponseLogisticChannelList> {
  const timestamp = ShopeeHelper.getTimestampNow();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.CHANNEL_LIST, config, timestamp);
  const commonParam = ShopeeHelper.commonParameter(config, signature, timestamp);

  const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.CHANNEL_LIST}${commonParam}`;
  return ShopeeHelper.httpGet(url, config);
}

/**
 *
 * @param orderNumber - Order number.
 * @param config - Shopee API configuration.
 * @returns {Promise<ShopeeResponseGetCategories>}
 */
export async function shippingParameter(orderNumber: string, config: ShopeeConfig): Promise<ShopeeResponseShippingParameter> {
  const timestamp = ShopeeHelper.getTimestampNow();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.SHIPPING_PARAMS, config, timestamp);

  const additionalParams = {
    order_sn: orderNumber,
  };
  const commonParam = ShopeeHelper.buildCommonParams(config, signature, timestamp, additionalParams);
  const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.SHIPPING_PARAMS}${commonParam}`;

  return ShopeeHelper.httpGet(url, config);
}

/**
 *
 * @param orderNumber - Order number.
 * @param config - Shopee API configuration.
 * @returns {Promise<ShopeeResponseShipOrder>}
 */
export async function shipOrder(
  orderNumber: string,
  addressId: number,
  timeSlot: string,
  config: ShopeeConfig,
): Promise<ShopeeResponseShipOrder> {
  const timestamp = ShopeeHelper.getTimestampNow();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.SHIP_ORDER, config, timestamp);

  const commonParam = ShopeeHelper.buildCommonParams(config, signature, timestamp);

  const body: ShopeeRequestShipOrder = {
    order_sn: orderNumber,
    pickup: {
      address_id: addressId,
      pickup_time_id: timeSlot,
    },
  };

  const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.SHIP_ORDER}${commonParam}`;

  return ShopeeHelper.httpPost(url, body, config);
}
