import * as ShopeeHelper from '../common/helper';
import { SHOPEE_END_POINT, SHOPEE_PATH } from '../common/constant';
import { ShopeeConfig } from '../dto/request/config.request';
import { ShopeeResponseLogisticChannelList } from '../dto/response/logistic.reponse';

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
