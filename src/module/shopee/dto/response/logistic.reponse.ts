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

interface ResponseLogisticChannelList extends ShopeeResponseCommon<LogisticChannelList> {}

export { ResponseLogisticChannelList as ShopeeResponseLogisticChannelList };
