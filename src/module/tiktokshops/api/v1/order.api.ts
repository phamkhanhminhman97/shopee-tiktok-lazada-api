import axios, { AxiosResponse } from "axios";
import { TiktokConfig } from "../../dto/request/config.request";
import { TIKTOK_PATH } from "../../common/constant";
import {
  commonParameter,
  genURLwithSignature,
  getTimestampHoursAgo,
} from "../../common/helper";

/**
 *
 * @param beforeHours
 * @param config
 * @returns
 */
export async function getOrderList(beforeHours: number, config: TiktokConfig) {
  const timestamp = Math.floor(Date.now() / 1000);
  const commonParam = commonParameter(config, timestamp);

  const orderList: string[] = [];
  let cursor = "";
  let i = 0;
  let hasMoreData = true;
  const timeFrom = getTimestampHoursAgo(beforeHours);

  try {
    while (hasMoreData) {
      const body = {
        page_size: 10,
        update_time_from: timeFrom,
        update_time_to: timestamp,
        cursor,
      };

      const url = genURLwithSignature(
        TIKTOK_PATH.ORDER_LIST,
        commonParam,
        config
      );
      const response = await axios.post(url, body);

      cursor = response.data.data.next_cursor;

      if (response.data.data?.order_list) {
        orderList.push(
          ...response.data.data?.order_list.map((item: any) => item.order_id)
        );
      }

      i += 1;
      hasMoreData = response.data.data.more;
    }
  } catch (error) {
    // Handle errors here
    console.error("Error fetching order list:", error);
  }

  return orderList;
}

/**
 *
 * @param orderNumber
 * @param config
 * @returns
 */
export async function getOrderDetail(
  orderNumber: string,
  config: TiktokConfig
) {
  const timestamp = Date.parse(new Date().toString()) / 1000;
  const commonParam = commonParameter(config, timestamp);
  const body = {
    order_id_list: [orderNumber],
  };
  const url = genURLwithSignature(
    TIKTOK_PATH.ORDER_DETAIL,
    commonParam,
    config
  );
  try {
    const res = await axios.post(url, body);
    const { order_list } = res.data.data;
    return order_list[0];
  } catch (error) {
    console.log("[GetOrder]", error);
  }
}
