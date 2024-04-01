import { SHOPEE_ALGORITHM, SHOPEE_DIGEST, SHOPEE_END_POINT, SHOPEE_PATH } from '../common/constant';
import { ShopeeConfig, ShopeeRequestRefreshToken } from '../dto/request/config.request';
import { createHmac } from 'crypto';
import * as ShopeeHelper from '../common/helper';
import { ShopeeResponseRefreshAccessToken } from '../dto/response/config.response';

/**
 *
 * @param host
 * @param config
 * @returns
 */
export async function generateAuthLink(redirectURL: string, config: ShopeeConfig) {
  const { partnerId } = config;

  const redirect = redirectURL;
  const timestamp = ShopeeHelper.getTimestampNow();

  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.GENERATE_AUTH_LINK, config, timestamp);
  const commonParam = `?partner_id=${partnerId}&redirect=${redirect}&timestamp=${timestamp}&sign=${signature}`;

  const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.GENERATE_AUTH_LINK}${commonParam}`;

  return { url, redirect };
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
  const baseString = params.reduce((prev: any, curr: any) => (prev += curr), '');
  const signature = createHmac('sha256', partnerKey).update(baseString).digest('hex');

  const commonParam = `?sign=${signature}&partner_id=${partnerId}&timestamp=${timestamp}`;
  const body = {
    code: authCode,
    partner_id: partnerId,
    shop_id: parseInt(shopId!),
  };
  const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.AUTH_TOKEN}${commonParam}`;
  const headers = ShopeeHelper.getHeaders(config);

  return ShopeeHelper.httpPost(url, body, headers);
}

/**
 * Use this API to refresh the access_token after it expires.
 * Refresh_token can be used once only, this API will also return a new refresh_token.
 * Please use the new refresh_token for the next RefreshAccessToken call
 * After a new access_token is generated, the old access_token is still valid for 5 minutes
 * If you get new refresh_token, old refresh_token is avaliable for 4 hours.
 * New refresh_token is avaliable for 30 days, new access_token is avaliable for 4 hours
 * Document shopee last updated: 2022-09-28
 * @param config
 * @returns
 */
export async function fetchTokenWithRefreshToken(config: ShopeeConfig): Promise<ShopeeResponseRefreshAccessToken> {
  const timestamp = ShopeeHelper.getTimestampNow();
  const { partnerId, shopId, partnerKey, refreshToken } = config;

  const params = [partnerId, SHOPEE_PATH.REFRESH_TOKEN, timestamp.toString()];
  const baseString = params.reduce((prev: any, curr: any) => (prev += curr), '');
  const signature = createHmac('sha256', partnerKey).update(baseString).digest('hex');

  const commonParam = '?sign=' + signature + '&partner_id=' + partnerId + '&timestamp=' + timestamp;
  const body: ShopeeRequestRefreshToken = {
    refresh_token: refreshToken!,
    partner_id: partnerId,
    shop_id: parseInt(shopId!),
  };

  const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.REFRESH_TOKEN}${commonParam}`;

  const headers = ShopeeHelper.getHeaders(config);
  return ShopeeHelper.httpPost(url, body, headers);
}

/**
 *
 * @param signature
 * @param config
 * @param payload
 * @returns
 */
export function verifySignature(signature: string, config, payload: any): boolean {
  const baseString = process.env.SHOPEE_WEBHOOK2 + '|' + payload.toString();
  const calAuth = createHmac(SHOPEE_ALGORITHM, config.partnerKey).update(baseString).digest(SHOPEE_DIGEST);
  if (calAuth === signature) {
    return true;
  }
  return false;
}
