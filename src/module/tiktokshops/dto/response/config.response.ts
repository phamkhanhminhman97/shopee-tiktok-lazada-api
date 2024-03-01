interface ResponseCommon<T> {
  code: string;
  message: string;
  request_id: string;
  data: T;
}

interface AccessToken {
  access_token: string;
  access_token_expire_in: number; //unix timestamp
  refresh_token: string;
  refresh_token_expire_in: number; //unix timestamp
  //The unique identity of the tts seller in this app, which is not equal to shop_id.
  //Please use our shop api to obtain your shop id
  open_id?: string;
  seller_name: string;
  request_id: string;
}

interface ShopList {
  region: string;
  shop_cipher: string;
  shop_code: string;
  shop_id: string;
  shop_name: string;
  type: number;
}

interface ResponseAccessToken extends ResponseCommon<AccessToken> {}
interface ResponseAuthorizedShop extends ResponseCommon<ShopList> {}

export {
  ResponseCommon as TiktokResponseCommon,
  ResponseAccessToken as TiktokResponseAccessToken,
  ResponseAuthorizedShop as TiktokResponseAuthorized,
};
