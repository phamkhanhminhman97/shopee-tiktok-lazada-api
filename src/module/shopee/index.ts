import { ShopeeConfig } from './dto/request/config.request';
import { fetchTokenWithAuthCode, getOrderDetail, getOrders } from './api/order.api';
import {
  getProductItemBaseInfo,
  getProductItemList,
  unListItem,
  updatePrice,
  updateStock,
  addItem,
  getChannelList,
  getCategory,
  getAttributes,
  getBrandList,
} from './api/product.api';

export class ShopeeModule {
  private config: ShopeeConfig;
  constructor(config: ShopeeConfig) {
    this.config = config;
  }

  async getOrders(beforeMinutes: number) {
    return await getOrders(beforeMinutes, this.config);
  }

  async getOrderDetail(orderNumber: string) {
    return await getOrderDetail(orderNumber, this.config);
  }

  async getProductItemList() {
    return await getProductItemList(this.config);
  }

  async getProductItemBaseInfo(itemId: string) {
    return await getProductItemBaseInfo(itemId, this.config);
  }

  async updateStock(itemId: number, stock: number) {
    return await updateStock(itemId, undefined, stock, this.config);
  }

  async unListItem(itemId: string, statusUnlist: boolean) {
    return await unListItem(itemId, statusUnlist, this.config);
  }

  async updatePrice(itemId: string, price: number) {
    return await updatePrice(itemId, price, this.config);
  }

  async addItem(body: any) {
    return await addItem(body, this.config);
  }

  async getChannelList() {
    return await getChannelList(this.config);
  }

  async fetchToken(authCode) {
    return await fetchTokenWithAuthCode(authCode, this.config);
  }

  async getCategory() {
    return await getCategory(this.config);
  }

  async getAttributes(categoryId: number) {
    return await getAttributes(categoryId, this.config);
  }

  async getBrandList(categoryId: number) {
    return await getBrandList(categoryId, this.config);
  }
}
