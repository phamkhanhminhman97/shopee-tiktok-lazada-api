import axios, { AxiosResponse } from "axios";
import { TIKTOK_PATH_202309 } from "../../common/constant";
import {
  commonParameter2,
  genURLwithSignature,
  replacePackageId,
} from "../../common/helper";
import { TiktokConfig } from "../../dto/request/config.request";

export async function getPackageTimeSlots(
  packageId: string,
  config: TiktokConfig
) {
  const timestamp = Date.parse(new Date().toString()) / 1000;
  const commonParam = commonParameter2(config, timestamp);
  const pathTimeSlot = replacePackageId(
    TIKTOK_PATH_202309.PACKAGE_TIME_SLOT,
    packageId
  );

  const url = genURLwithSignature(pathTimeSlot, commonParam, config);

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
