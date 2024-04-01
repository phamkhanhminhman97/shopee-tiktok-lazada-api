interface Config {
  appKey: string;
  appSecret: string;
  countryCode?: string;
  shopId?: string;
  appAccessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  refreshExpiresIn?: number;
}

export interface ConfigList {
  [shopId: string]: Config;
}

export { Config as LazadaConfig, ConfigList as LazadaConfigList };
