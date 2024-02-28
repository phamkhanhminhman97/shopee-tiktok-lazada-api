import { TiktokResponseCommon } from "./config.response";

interface PickupSlot {
  avaliable: boolean;
  end_time: boolean;
  start_time: boolean;
}

interface PackageTimeSlot extends TiktokResponseCommon {
  data: {
    can_drop_off: boolean;
    can_pickup: boolean;
    drop_off_point_url: string;
    pickup_slots: Array<PickupSlot>;
  };
}

export { PackageTimeSlot as TiktokResponsePackageTimeSlot };