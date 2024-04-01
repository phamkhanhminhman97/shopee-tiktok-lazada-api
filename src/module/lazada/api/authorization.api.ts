import { LAZADA_PATH, LZD_ALGORITHM, LZD_END_POINT_AUTH } from '../common/constant';
import { execute, executeAuth } from '../common/helper';
import { LazadaConfig } from '../dto/request/config.request';

/**
 *
 * @param host
 * @param appKey
 * @param shopId
 * @returns
 */
export function generateAuthLink(host: string, appKey: string, shopId: string) {
  const redirect = `https://${host}/marketplace/lazada/redirect`;

  const queryParams = new URLSearchParams({
    response_type: 'code',
    redirect_uri: redirect,
    client_id: appKey,
    state: shopId,
  });

  const url = decodeURIComponent(`${LZD_END_POINT_AUTH}?${queryParams}`);
  //  const url = `${LZD_END_POINT_AUTH}?response_type=code&force_auth=true&redirect_uri=${redirect}&client_id=${appKey}&state=${shopId}`;

  return { url, redirect };
}

/**
 *
 * @param authCode
 * @param config
 * @returns
 */
export function fetchTokenWithAuthCode(authCode: string, config: LazadaConfig) {
  const { appKey, appSecret } = config;

  const payload = {
    app_key: appKey,
    sign_method: LZD_ALGORITHM,
    timestamp: new Date().getTime(),
    code: authCode,
  };

  return executeAuth(LAZADA_PATH.FETCH_TOKEN, payload, appSecret);
}

export async function refreshToken(config: LazadaConfig) {
  const payload = {
    refresh_token: config.refreshToken,
    app_key: config.appKey,
    sign_method: LZD_ALGORITHM,
    timestamp: new Date().getTime(),
  };
  return execute(LAZADA_PATH.REFRESH_TOKEN, payload, config.appSecret);
}
