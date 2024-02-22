import axios, { AxiosResponse } from "axios";
import { TiktokConfig } from "../../dto/request/config.request";
import { TIKTOK_PATH, TIKTOK_PATH_202309 } from "../../common/constant";
import {
  commonParameter,
  genURLwithSignature,
  getTimestampHoursAgo,
} from "../../common/helper";

export async function getOrderDetail(
  orderNumber: string,
  config: TiktokConfig
) {
  const timestamp = Date.parse(new Date().toString()) / 1000;
  const commonParam = commonParameter(config, timestamp) + '&ids=' + orderNumber;

  const url = genURLwithSignature(
    TIKTOK_PATH_202309.ORDER_DETAIL,
    commonParam,
    config
  );
  try {
    const res = await axios.get(url);
    const { order_list } = res.data.data;
    return order_list;
  } catch (error) {
    console.log("[GetOrderDetail]", error);
  }
}
