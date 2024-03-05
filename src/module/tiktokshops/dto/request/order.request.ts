//import { TiktokRequestCommon } from './config.request';

interface RequestShipOrder {
  order_id: string;
}

interface RequestOrderDetail {
  order_id_list: string[]; //Must be less than 50
}

export { RequestShipOrder as TiktokRequestShipOrder, RequestOrderDetail as TiktokRequestOrderDetail };
