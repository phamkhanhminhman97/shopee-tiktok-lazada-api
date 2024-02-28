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

  async getProductList() {
    return await getProductsLists(this.config);
  }

  async updateStock(productId: string, skuId: string, quantity: number) {
    return await updateStock(productId, skuId, quantity, this.config);
  }

  async getProductDetail(productId: string) {
    return await getProductDetail(productId, this.config);
  }

  async deactiveProduct(productId: string[]) {
    return await deactiveProduct(productId, this.config);
  }

  async activeProduct(productId: string[]) {
    return await activeProduct(productId, this.config);
  }

  async updatePrice(productId: string, skuId: string, price: number) {
    return await updatePrice(productId, skuId, price, this.config);
  }

  async createProduct() {
    return await createProduct(this.config);
  }

  async getCategories() {
    return await getCategories(this.config);
  }

  async fetchToken(authCode: string) {
    return await fetchToken(authCode, this.config);
  }

  async getAuthorizedShop() {
    return await getAuthorizedShop(this.config);
  }

  async getWarehouseList() {
    return await getWarehouseList(this.config);
  }
}
