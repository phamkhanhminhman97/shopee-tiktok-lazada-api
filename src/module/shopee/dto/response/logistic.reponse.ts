import { ShopeeResponseCommon } from './config.response';

interface ItemMaxDimension {
  dimension_sum: number;
  height: number;
  length: number;
  unit: string;
  width: number;
}

interface LogisticsCapability {
  seller_logistics: boolean;
}

interface VolumeLimit {
  item_max_volume: number;
  item_min_volume: number;
}

interface WeightLimit {
  item_max_weight: number;
  item_min_weight: number;
}

interface LogisticsChannel {
  block_seller_cover_shipping_fee: boolean;
  cod_enabled: boolean;
  enabled: boolean;
  fee_type: string;
  force_enable: boolean;
  item_max_dimension: ItemMaxDimension;
  logistics_capability: LogisticsCapability;
  logistics_channel_id: number;
  logistics_channel_name: string;
  logistics_description: string;
  mask_channel_id: number;
  seller_logistic_has_configuration: any; // You can replace `any` with the appropriate type if available
  size_list: any[]; // You can replace `any` with the appropriate type if available
  support_cross_border: boolean;
  volume_limit: VolumeLimit;
  weight_limit: WeightLimit;
}

interface LogisticChannelList {
  logistics_channel_list: LogisticsChannel[];
}
interface InfoNeeded {
  dropoff: string[];
  pickup: string[];
  non_integrated: string[];
}

interface Dropoff {
  branch_list: Branch[];
  slug_list?: Slug[];
}

interface Branch {
  branch_id: number;
  region: string;
  state: string;
  city: string;
  address: string;
  zipcode: string;
  district: string;
  town: string;
}

interface Slug {
  slug: string;
  slug_name: string;
}

interface Pickup {
  address_list: PickupAddress[];
}

interface PickupAddress {
  address_id: number;
  region: string;
  state: string;
  city: string;
  district: string;
  town: string;
  address: string;
  zipcode: string;
  address_flag: string[];
  time_slot_list: PickupTime[] | null;
}

interface PickupTime {
  date: number; // timestamp
  time_text?: string;
  pickup_time_id: string;
}

interface ShippingParameter {
  info_needed: InfoNeeded;
  dropoff: Dropoff | null;
  pickup: Pickup;
}

interface ShipOrder {}

interface ResponseShippingParameter extends ShopeeResponseCommon<ShippingParameter> {}
interface ResponseLogisticChannelList extends ShopeeResponseCommon<LogisticChannelList> {}
interface ResponseShipOrder extends ShopeeResponseCommon<ShipOrder> {}

export {
  ResponseLogisticChannelList as ShopeeResponseLogisticChannelList,
  ResponseShippingParameter as ShopeeResponseShippingParameter,
  ResponseShipOrder as ShopeeResponseShipOrder,
};
