interface CountryUserInfo {
  country: string;
  seller_id: string;
  user_id: number;
}

interface TokenData {
  access_token: string;
  refresh_token: string;
  country: string;
  refresh_expires_in: number;
  account_platform: string;
  expires_in: number;
  account: string;
  country_user_info: CountryUserInfo[];
}

type ResponseAccessToken = TokenData;

export { ResponseAccessToken as LazadaResponseAccessToken };
