export interface Config {
  appKey: string;
  appSecret: string;
  shopId: string;
  accessToken: string;
  accessTokenExpire?: string;
  refreshToken?: string;
}

export interface ConfigList {
  [shopId: string]: Config;
}

interface RequestAccessToken {
  app_key: string;
  app_secret: string;
  auth_code: string; //The code you obtain in the last step
  grant_type: string; //The way you grant token. Only "authorized_code" is accepted.
}

interface RequestRefreshToken {
  app_key: string;
  app_secret: string;
  auth_code: string; //The code you obtain in the last step
  grant_type: string; //The way you grant token. Only "refresh_token" is accepted.
}

interface RequestCommon {
  access_token?: string;
  shop_id?: string;
}

export {
  Config as TiktokConfig,
  ConfigList as TiktokConfigList,
  RequestAccessToken as TiktokRequestAccessToken,
  RequestRefreshToken as TiktokRequestRefreshToken,
  RequestCommon as TiktokRequestCommon,
};
