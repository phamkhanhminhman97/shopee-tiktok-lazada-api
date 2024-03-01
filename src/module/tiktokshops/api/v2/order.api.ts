import axios, { AxiosResponse } from "axios";
import { TiktokConfig } from "../../dto/request/config.request";
import { TIKTOK_PATH_202309 } from "../../common/constant";
import {
  commonParameter2,
  genURLwithSignature,
  getTimestampHoursAgo,
  httpGet,
  httpPost,
} from "../../common/helper";
import { TiktokResponseOrderDetail } from "../../dto/response/order.response";

export async function getOrderDetail(
  orderNumber: string,
  config: TiktokConfig
): Promise<TiktokResponseOrderDetail> {
  const timestamp = Math.floor(Date.now() / 1000);
  const commonParam = `${commonParameter2(
    config,
    timestamp
  )}&ids=${orderNumber}`;

  const url = genURLwithSignature(
    TIKTOK_PATH_202309.ORDER_DETAIL,
    commonParam,
    config
  );

  return httpGet(url, config);
}

export async function getOrderList(before, config: TiktokConfig): Promise<any> {
  const timestamp = Math.floor(Date.now() / 1000);
  const commonParam = `${commonParameter2(config, timestamp)}&page_size=20`;

  const body = {
    order_status: "DELIVERED",
  };

  const url = genURLwithSignature(
    TIKTOK_PATH_202309.ORDER_LIST,
    commonParam,
    config,
    body
  );

  return httpPost(url, body, config);
}
