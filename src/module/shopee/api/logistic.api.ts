import * as ShopeeHelper from '../common/helper';
import { SHOPEE_END_POINT, SHOPEE_PATH } from '../common/constant';
import { ShopeeConfig } from '../dto/request/config.request';
import axios from 'axios';
export async function getChannelList(config: ShopeeConfig) {
  const timestamp = ShopeeHelper.getTimestampNow();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.CHANNEL_LIST, config, timestamp);
  const commonParam = ShopeeHelper.commonParameter(config, signature, timestamp);

  const url = SHOPEE_END_POINT + SHOPEE_PATH.CHANNEL_LIST + commonParam;
  const res = await axios.get(url);
  return res.data;
}
