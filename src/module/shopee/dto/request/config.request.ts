export interface MultiQuantity {
  shopee?: number;
  lazada?: number;
  tiki?: number;
  tiktok?: number;
}

export interface Config {
  partnerId: string;
  partnerKey: string;
  shopId: string;
  accessToken: string;
  refreshToken?: string;
  tokenExpired?: string;
}

export interface ConfigList {
  [shopId: string]: Config;
}

interface RequestCommonParameters {
  sign?: string; //Signature generated by partner_id, api path, timestamp, access_token, shop_id and partner_key via HMAC-SHA256 hashing algorithm.
  partner_id?: number; //The partner_id obtained from the App. This partner_id is put into the query
  timestamp?: number; //	Timestamp, valid for 5 minutes.
  access_token?: string; //The token for API access, using to identify your permission to the api. Valid for multiple use and expires in 4 hours.
  shop_id?: number; //Shopee's unique identifier for a shop. Required param for most APIs.
}

interface RequestGetAccessToken {
  code: string; //the return from the generateAuthURL includes auth_code.
  partner_id: number;
  shop_id: number;
  sign?: string; //generate manual
  timestamp?: number; //generate manual
}

interface RequestRefreshToken {
  refresh_token: string; //Each refresh_token is valid for 30 days,
  partner_id: number;
  shop_id: number;
  sign?: string;
  timestamp?: number; //	Timestamp, valid for 5 minutes.
}

export {
  Config as ShopeeConfig,
  ConfigList as ShopeeConfigList,
  RequestCommonParameters as ShopeeRequestCommon,
  RequestGetAccessToken as ShopeeRequestGetAccesstoken,
  RequestRefreshToken as ShopeeRequestRefreshToken,
};
