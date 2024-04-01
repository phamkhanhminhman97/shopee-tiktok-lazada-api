interface CountryUserInfo {
  country: string;
  user_id: string;
  seller_id: string;
  short_code: string;
}

interface ResponseGetAccessToken {
  expires_in: number;
  country: string;
  country_user_info: CountryUserInfo[];
  account_platform: string;
  access_token: string;
  account: string;
  refresh_expires_in: number;
  refresh_token: string;
  code: string;
}

export { ResponseGetAccessToken as LazadaResponseAccessToken };
