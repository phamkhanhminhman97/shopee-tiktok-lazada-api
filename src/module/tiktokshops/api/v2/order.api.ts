import axios, { AxiosResponse } from "axios";
import { TiktokConfig } from "../../dto/request/config.request";
import { TIKTOK_PATH_202309 } from "../../common/constant";
import {
  commonParameter2,
  genURLwithSignature,
  getTimestampHoursAgo,
} from "../../common/helper";

export async function getOrderDetail(
  orderNumber: string,
  config: TiktokConfig
) {
  const timestamp = Date.parse(new Date().toString()) / 1000;
  const commonParam =
    commonParameter2(config, timestamp) + "&ids=" + orderNumber;

  const url = genURLwithSignature(
    TIKTOK_PATH_202309.ORDER_DETAIL,
    commonParam,
    config
  );

  try {
    const res: AxiosResponse = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "x-tts-access-token": config.accessToken,
      },
    });
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
}

export async function getOrderList(before, config: TiktokConfig) {
  const timestamp = Date.parse(new Date().toString()) / 1000;
  const commonParam =
    commonParameter2(config, timestamp) + "&page_size=20";

  const body = {
    order_status: 'DELIVERED'
  };

  const url = genURLwithSignature(
    TIKTOK_PATH_202309.ORDER_LIST,
    commonParam,
    config,
    body
  );

  try {
    const res: AxiosResponse = await axios.post(url, body, {
      headers: {
        "content-type": "application/json",
        "x-tts-access-token": config.accessToken,
      },
    });
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
}
