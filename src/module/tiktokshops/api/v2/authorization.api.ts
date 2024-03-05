import { TiktokConfig } from '../../dto/request/config.request';
import { TIKTOK_PATH_202309 } from '../../common/constant';
import * as TiktokHelper from '../../common/helper';
import { TiktokResponseAuthorized } from '../../dto/response/config.response';

/**
 * @param config - Tiktok API configuration.
 * @returns {Promise<TiktokResponseAuthorized>} - Response of get authorized shop.
 */
export async function getAuthorizedShop(config: TiktokConfig): Promise<TiktokResponseAuthorized> {
  const timestamp = Math.floor(Date.now() / 1000);
  const commonParam = TiktokHelper.commonParameter(config, timestamp);

  const url = TiktokHelper.genURLwithSignature(TIKTOK_PATH_202309.AUTHORIZED_SHOP, commonParam, config);

  return TiktokHelper.httpGet(url, config);
}
