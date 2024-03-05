import { ShopeeConfig } from './dto/request/config.request';
import { fetchTokenWithAuthCode, getOrderDetail, getOrders } from './api/order.api';
import {
  getProductItemBaseInfo,
  getProductItemList,
  unListItem,
  updatePrice,
  updateStock,
  addItem,
  getCategory,
  getAttributes,
  getBrandList,
} from './api/product.api';
import { ShopeeResponseOrderDetail } from './dto/response/order.response';
import {
  ShopeeResponseGetBrandList,
  ShopeeResponseProductBaseItemInfo,
  ShopeeResponseUnlistItem,
  ShopeeResponseUpdatePrice,
  ShopeeResponseUpdateStock,
} from './dto/response/product.response';
import { getChannelList } from './api/logistic.api';

export class ShopeeModule {
  private config: ShopeeConfig;
  constructor(config: ShopeeConfig) {
    this.config = config;
  }

  async getOrders(beforeMinutes: number): Promise<any> {
    return await getOrders(beforeMinutes, this.config);
  }

  async getOrderDetail(orderNumber: string): Promise<ShopeeResponseOrderDetail> {
    return await getOrderDetail(orderNumber, this.config);
  }

  async getProductItemList(): Promise<any> {
    return await getProductItemList(this.config);
  }

  async getProductItemBaseInfo(itemIds: string[]): Promise<ShopeeResponseProductBaseItemInfo> {
    return await getProductItemBaseInfo(itemIds, this.config);
  }

  async updateStock(itemId: number, stock: number): Promise<ShopeeResponseUpdateStock> {
    return await updateStock(itemId, undefined, stock, this.config);
  }

  async unListItem(itemId: string, statusUnlist: boolean): Promise<ShopeeResponseUnlistItem> {
    return await unListItem(itemId, statusUnlist, this.config);
  }

  async updatePrice(itemId: string, price: number): Promise<ShopeeResponseUpdatePrice> {
    return await updatePrice(itemId, price, this.config);
  }

  async addItem(body: any): Promise<any> {
    return await addItem(body, this.config);
  }

  async getChannelList(): Promise<any> {
    return await getChannelList(this.config);
  }

  async fetchToken(authCode): Promise<any> {
    return await fetchTokenWithAuthCode(authCode, this.config);
  }

  async getCategory(): Promise<any> {
    return await getCategory(this.config);
  }

  async getAttributes(categoryId: number): Promise<any> {
    return await getAttributes(categoryId, this.config);
  }

  async getBrandList(categoryId: number): Promise<ShopeeResponseGetBrandList> {
    return await getBrandList(categoryId, this.config);
  }
}
