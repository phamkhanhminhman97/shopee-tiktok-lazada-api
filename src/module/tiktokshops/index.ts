import { getOrderDetail, getOrderList } from "./api/v2/order.api";
import {
  getProductsLists,
  updateStock,
  deactiveProduct,
  activeProduct,
  updatePrice,
  createProduct,
  getCategories,
  fetchToken,
  getWarehouseList,
} from "./api/v1/product.api";
import { TiktokConfig } from "./dto/request/config.request";
import { getAuthorizedShop } from "./api/v2/authorization.api";
import { getProductDetail } from "./api/v2/product.api";

export class TiktokModule {
  private config: TiktokConfig;
  constructor(config: TiktokConfig) {
    this.config = config;
  }

  async getOrderList(beforeHours: number) {
    return await getOrderList(beforeHours, this.config);
  }

  async getOrderDetail(orderNumber: string) {
    return await getOrderDetail(orderNumber, this.config);
  }

  async getProductDetail(productId: string) {
    return await getProductDetail(productId, this.config);
  }

  async getAuthorizedShop() {
    return await getAuthorizedShop(this.config);
  }
}
