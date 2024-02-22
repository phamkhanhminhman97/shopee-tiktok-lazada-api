import axios, { AxiosResponse } from "axios";
import { TiktokConfig } from "../../dto/request/config.request";
import { TIKTOK_PATH, TIKTOK_PATH_202309 } from "../../common/constant";
import {
  commonParameter,
  genURLwithSignature,
  getTimestampHoursAgo,
} from "../../common/helper";

export async function getAuthorizedShop(
  config: TiktokConfig
) {
  const timestamp = Date.parse(new Date().toString()) / 1000;
  const commonParam = commonParameter(config, timestamp);

  const url = genURLwithSignature(
    TIKTOK_PATH_202309.AUTHORIZED_SHOP,
    commonParam,
    config
  );
  try {
    const res = await axios.get(url);
    const { order_list } = res.data.data;
    return order_list;
  } catch (error) {
    console.log("[GetOrder]", error);
  }
}
