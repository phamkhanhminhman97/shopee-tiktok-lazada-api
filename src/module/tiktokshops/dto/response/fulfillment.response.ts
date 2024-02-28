import { TiktokResponseCommon } from "./config.response";

interface PACKAGE_TIME_SLOT extends TiktokResponseCommon {
  data: {
    can_drop_off: boolean;
    can_pickup: boolean;
    drop_off_point_url: string;
  };
}

export {
  PACKAGE_TIME_SLOT as TIKTOK_PACKAGE_TIME_SLOT
}