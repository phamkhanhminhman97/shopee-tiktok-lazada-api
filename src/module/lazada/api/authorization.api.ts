import { LAZADA_PATH, LZD_ALGORITHM, LZD_END_POINT_AUTH } from '../common/constant';
import { executeAuth } from '../common/helper';
import { LazadaConfig } from '../dto/request/config.request';
import { LazadaResponseAccessToken } from '../dto/response/config.response';
import * as LazadaHelper from '../common/helper';

/**
 *
 * @param host
 * @param appKey
 * @param shopId
 * @returns
 */
export function generateAuthLink(redirectURL: string, appKey: string, uuid: string) {
  const queryParams = new URLSearchParams({
    response_type: 'code',
    redirect_uri: redirectURL,
    client_id: appKey,
    uuid,
  });

  const url = decodeURIComponent(`${LZD_END_POINT_AUTH}?${queryParams}`);

  return { url, redirect: redirectURL };
}

/**
 *
 * @param authCode
 * @param config
 * @returns
 */
export function fetchTokenWithAuthCode(authCode: string, uuid: string, config: LazadaConfig): Promise<LazadaResponseAccessToken> {
  const { appKey, appSecret } = config;

  const payload = {
    app_key: appKey,
    sign_method: LZD_ALGORITHM,
    timestamp: LazadaHelper.getTimestampMilisec(),
    code: authCode,
    uuid,
  };

  return executeAuth(LAZADA_PATH.FETCH_TOKEN, payload, appSecret);
}

export async function refreshToken(config: LazadaConfig) {
  const payload = {
    refresh_token: config.refreshToken,
    app_key: config.appKey,
    sign_method: LZD_ALGORITHM,
    timestamp: LazadaHelper.getTimestampMilisec(),
  };
  return LazadaHelper.httpGet(LAZADA_PATH.REFRESH_TOKEN, payload, config.appSecret);
}
