import { ShopeeRequestCommon } from "./config.request";

interface ItemList {
  item_id: string;
  unlist: boolean;
}

interface RequestUnlistItem extends ShopeeRequestCommon {
  item_list: Array<ItemList>;
}

interface SellerStock {
  location_id?: string; //you can get the location id from v2.shop.get_warehouse_detail api
  stock: number;
}

interface StockList {
  model_id?: number; //0 for no model item.
  seller_stock: Array<SellerStock>;
}

interface RequestUpdateStock extends ShopeeRequestCommon {
  item_id: number;
  stock_list: Array<StockList>;
}

interface RequestGetItemList extends ShopeeRequestCommon {
  offset: number;
  page_size: number; //	the size of one page Max=100.
  update_time_from?: number; //unix timestamp
  update_time_to?: number;
  item_status: string[]; //NORMAL/BANNED/DELETED/UNLIST example:item_status=NORMAL&item_status=BANNED
}

interface RequestGetModelList extends ShopeeRequestCommon {
  item_id: number;
}

export {
  RequestUnlistItem as ShopeeRequestUnlistItem,
  RequestUpdateStock as ShopeeRequestUpdateStock,
  RequestGetItemList as ShopeeRequestGetItemList,
  RequestGetModelList as ShopeeRequestGetModelList,
};
