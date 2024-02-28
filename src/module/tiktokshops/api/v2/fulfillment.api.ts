import axios, { AxiosResponse } from "axios";
import { TIKTOK_PATH_202309 } from "../../common/constant";
import {
  commonParameter2,
  genURLwithSignature,
  replacePackageId,
} from "../../common/helper";
import { TiktokConfig } from "../../dto/request/config.request";
import { TiktokRequestShipPackage } from "../../dto/request/fulfillment.request";

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

export async function shipPackage(
  packageId: string,
  payload: TiktokRequestShipPackage,
  config: TiktokConfig
): Promise<any> {
  const timestamp = Date.parse(new Date().toString()) / 1000;
  const commonParam = commonParameter2(config, timestamp);
  const pathTimeSlot = replacePackageId(
    TIKTOK_PATH_202309.SHIP_PACKAGE,
    packageId
  );

  const url = genURLwithSignature(pathTimeSlot, commonParam, config);

  const body: TiktokRequestShipPackage = {
    handover_method: payload.handover_method,
    pickup_slot: {
      start_time: payload.pickup_slot.start_time,
      end_time: payload.pickup_slot.end_time,
    },
  };

  try {
    const res: AxiosResponse = await axios.post(url, body, {
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
