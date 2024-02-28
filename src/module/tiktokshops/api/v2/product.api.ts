import axios, { AxiosResponse } from "axios";
import { TIKTOK_PATH_202309 } from "../../common/constant";
import { commonParameter2, genURLwithSignature } from "../../common/helper";
import { TiktokConfig } from "../../dto/request/config.request";


export async function getProductDetail(
  productId: string,
  config: TiktokConfig
) {
  const timestamp = Date.parse(new Date().toString()) / 1000;
  const commonParam =
    commonParameter2(config, timestamp) + "&product_id=" + productId;

  const url = genURLwithSignature(
    TIKTOK_PATH_202309.PRODUCT_DETAIL,
    commonParam,
    config
  );

  try {
    const res: AxiosResponse = await axios.get(url);

    return res.data.data;
  } catch (err: any) {
    return err.response.data;
  }
}