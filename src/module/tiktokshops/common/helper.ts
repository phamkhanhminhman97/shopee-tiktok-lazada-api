import * as crypto from "crypto-js";
import { TIKTOK_END_POINT } from "./constant";
export function commonParameter(config, timestamp) {
  const { appKey, accessToken, shopId } = config;
  const commonParam =
    "?app_key=" +
    appKey +
    "&access_token=" +
    accessToken +
    "&sign=" +
    "" +
    "&timestamp=" +
    timestamp +
    "&shop_id=" +
    shopId;

  return commonParam;
}

export function commonParameter2(config, timestamp) {
  const { appKey, shopId, shopCipher } = config;
  const commonParam =
    "?app_key=" +
    appKey +
    "&sign=" +
    "" +
    "&timestamp=" +
    timestamp +
    "&shop_id=" +
    shopId + 
    "&shop_cipher=" +
    shopCipher;

  return commonParam;
}

export function objKeySort(obj) {
  const newKey = Object.keys(obj).sort();
  const newObj = {};
  for (let i = 0; i < newKey.length; i++) {
    newObj[newKey[i]] = obj[newKey[i]];
  }
  return newObj;
}
export function signRequest(params, path, config, body) {
  console.log(body);
  
  const { appSecret } = config;
  delete params["sign"];
  delete params["access_token"];
  const sortParam = objKeySort(params);
  let signstring = appSecret + path;

  for (const key in sortParam) {
    signstring = signstring + key + sortParam[key];
  }
  signstring = signstring + JSON.stringify(body) + appSecret;
  
  const signature = crypto.HmacSHA256(signstring, appSecret).toString();
  return signature;
}

export function parseParmsURL(url) {
  const params = {};
  url.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}
export function genURLwithSignature(path, commonParam, config, body?) {
  const url = new URL(TIKTOK_END_POINT + path + commonParam);
  const params = parseParmsURL(url);
  const signature2 = signRequest(params, path, config, body);
  url.searchParams.set("sign", signature2);
  return url.toString();
}

export function getTimestampHoursAgo(hours: number): number {
  const oldDate = new Date();
  oldDate.setMilliseconds(0);
  return Math.floor((oldDate.getTime() - hours * 60 * 60 * 1000) / 1000);
}
