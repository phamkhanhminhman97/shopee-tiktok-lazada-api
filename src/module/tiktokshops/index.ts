import { getOrderDetail, getOrderList } from "./api/order.api";
import {
  getProductsLists,
  updateStock,
  getProductDetail,
  deactiveProduct,
  activeProduct,
  updatePrice,
  createProduct,
  getCategories,
  fetchToken,
  getAuthorizedShop,
  getWarehouseList,
} from "./api/product.api";
import { TiktokConfig } from "./dto/request/config.request";

export const configTiktok: TiktokConfig = {
  appKey: process.env.TIKTOK_APP_KEY || "123123",
  appSecret:
    process.env.TIKTOK_APP_SECRET || "123123",
  shopId: process.env.TIKTOK_SHOP_ID || "123123",
  accessToken:
    process.env.TIKTOK_ACCESS_TOKEN || "abcdef",
  refreshToken: process.env.API_TOKEN || "123123",
};

export class TiktokModule {
  private config: TiktokConfig;
  constructor(config: TiktokConfig) {
    this.config = config;
  }

  async getOrders(beforeHours: number) {
    return await getOrderList(beforeHours, this.config);
  }

  async getOrderDetail(orderNumber: string, config: TiktokConfig) {
    return await getOrderDetail(orderNumber, config);
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

  async getShopInfo() {
    return await getAuthorizedShop(this.config);
  }

  async getWarehouseList() {
    return await getWarehouseList(this.config);
  }
}
