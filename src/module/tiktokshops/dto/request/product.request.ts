import { TiktokRequestCommon } from './config.request';

interface StockInfo {
  warehouse_id: string;
  available_stock: number;
}

interface Sku {
  id: string; //sku_id
  stock_infos: StockInfo;
}

interface RequestUpdateStock extends TiktokRequestCommon {
  product_id: string;
  skus: Array<Sku>;
}

interface RequestDeactiveProduct extends TiktokRequestCommon {
  product_ids: string[];
}

interface RequestActiveProduct extends TiktokRequestCommon {
  product_ids: string[];
}

export {
  RequestUpdateStock as TiktokRequestUpdateStock,
  RequestActiveProduct as TiktokRequestActiveProduct,
  RequestDeactiveProduct as TiktokRequestDeactiveProduct,
};
