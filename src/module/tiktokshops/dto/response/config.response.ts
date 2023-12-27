interface ResponseCommon {
  code: string;
  message: string;
  request_id: string;
}

interface ResponseAccessToken extends ResponseCommon {
  data: {
    access_token: string;
    access_token_expire_in: number; //unix timestamp
    refresh_token: string;
    refresh_token_expire_in: number; //unix timestamp
    //The unique identity of the tts seller in this app, which is not equal to shop_id.
    //Please use our shop api to obtain your shop id
    open_id?: string;
    seller_name: string;
    request_id: string;
  };
}

export {
  ResponseCommon as TiktokResponseCommon,
  ResponseAccessToken as TiktokResponseAccessToken,
};
