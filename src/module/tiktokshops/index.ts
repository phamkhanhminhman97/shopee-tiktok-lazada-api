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
  appKey: process.env.TIKTOK_APP_KEY || "664d5qmeq73q6",
  appSecret:
    process.env.TIKTOK_APP_SECRET || "2d6f25655f90832c13532b37a4d9ad3150a43884",
  shopId: process.env.TIKTOK_SHOP_ID || "7494605277310061286",
  accessToken:
    process.env.TIKTOK_ACCESS_TOKEN ||
    "ROW_D951SAAAAACf8kHaP46oBxcoU1k4h7Wn3C0W2wY7Gs7EJ6pFYTZ9LLjZuvldvnKcYUWuO0Hulo0lqhh7xlha29Gbd35djdK2tlQ7qVVt-G-lzoZpJG16D4zYawTkZJ9owyBQV2RMZDyi9bMxXHpELIUYqi7l3xlf8M4y6sPnzCc22cSPnUSAkA",
  refreshToken: process.env.API_TOKEN || "6c53626e62411a411677586c5a76624e624d",
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
