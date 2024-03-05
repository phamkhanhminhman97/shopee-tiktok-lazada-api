import * as crypto from 'crypto-js';
import { TIKTOK_END_POINT } from './constant';
import { TiktokConfig } from '../dto/request/config.request';
import axios, { AxiosResponse } from 'axios';
export function commonParameter(config, timestamp) {
  const { appKey } = config;
  const commonParam = '?app_key=' + appKey + '&sign=' + '' + '&timestamp=' + timestamp;

  return commonParam;
}

function commonParameter2(config, timestamp) {
  const { appKey, shopId, shopCipher } = config;
  const commonParam =
    '?app_key=' + appKey + '&sign=' + '' + '&timestamp=' + timestamp + '&shop_id=' + shopId + '&shop_cipher=' + shopCipher;

  return commonParam;
}

function objKeySort(obj) {
  const newKey = Object.keys(obj).sort();
  const newObj = {};
  for (let i = 0; i < newKey.length; i++) {
    newObj[newKey[i]] = obj[newKey[i]];
  }
  return newObj;
}
function signRequest(params: Record<string, string>, path: string, config: Record<string, any>, body: Record<string, any>) {
  const { appSecret } = config;
  delete params['sign'];
  delete params['access_token'];
  const sortParam = objKeySort(params);
  let signstring = appSecret + path;

  for (const key in sortParam) {
    signstring = signstring + key + sortParam[key];
  }
  signstring = signstring + (!body ? appSecret : JSON.stringify(body) + appSecret);

  const signature = crypto.HmacSHA256(signstring, appSecret).toString();
  return signature;
}

function parseParmsURL(url) {
  const params = {};
  url.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}
function genURLwithSignature(path, commonParam, config, body?) {
  const url = new URL(TIKTOK_END_POINT + path + commonParam);
  const params = parseParmsURL(url);
  const signature2 = signRequest(params, path, config, body);
  url.searchParams.set('sign', signature2);
  return url.toString();
}

function getTimestampHoursAgo(hours: number): number {
  const oldDate = new Date();
  oldDate.setMilliseconds(0);
  return Math.floor((oldDate.getTime() - hours * 60 * 60 * 1000) / 1000);
}

export function replacePackageId(path: string, packageId: string): string {
  return path.replace('{package_id}', packageId);
}

function replacePlaceholder(path: string, placeholder: string, replacement: string): string {
  return path.replace(`{${placeholder}}`, replacement);
}

function handleError(err: any) {
  return err.response ? err.response.data : { error: 'Unknown error' };
}

function getHeaders(config: TiktokConfig, contentType: string = 'application/json') {
  return {
    'Content-Type': contentType,
    'x-tts-access-token': config.accessToken,
  };
}

async function httpPost(url: string, body: any, headers: any) {
  try {
    const res: AxiosResponse = await axios.post(url, body, {
      headers,
    });
    return res.data;
  } catch (err: any) {
    return handleError(err);
  }
}
async function httpGet(url: string, config: TiktokConfig) {
  try {
    const res: AxiosResponse = await axios.get(url, {
      headers: getHeaders(config),
    });
    return res.data.data;
  } catch (err: any) {
    return handleError(err);
  }
}

export {
  httpGet,
  httpPost,
  getHeaders,
  commonParameter2,
  objKeySort,
  signRequest,
  parseParmsURL,
  genURLwithSignature,
  getTimestampHoursAgo,
  replacePlaceholder,
};
