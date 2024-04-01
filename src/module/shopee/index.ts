import { ShopeeConfig } from './dto/request/config.request';
import { getOrderDetail, getOrders } from './api/order.api';
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
  ShopeeResponseGetAttributes,
  ShopeeResponseGetBrandList,
  ShopeeResponseGetCategories,
  ShopeeResponseProductBaseItemInfo,
  ShopeeResponseUnlistItem,
  ShopeeResponseUpdatePrice,
  ShopeeResponseUpdateStock,
} from './dto/response/product.response';
import { getChannelList, shipOrder, shippingParameter } from './api/logistic.api';
import {
  ShopeeResponseLogisticChannelList,
  ShopeeResponseShipOrder,
  ShopeeResponseShippingParameter,
} from './dto/response/logistic.reponse';
import { fetchTokenWithAuthCode, fetchTokenWithRefreshToken } from './api/authorization.api';
import { ShopeeResponseRefreshAccessToken } from './dto/response/config.response';

export class ShopeeClient {
  private config: ShopeeConfig;
  constructor(config: ShopeeConfig) {
    this.config = config;
  }

  setConfig(config: ShopeeConfig) {
    this.config.accessToken = config.accessToken;
    this.config.refreshToken = config.refreshToken;
  }

  getConfig() {
    return this.config;
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

  async getChannelList(): Promise<ShopeeResponseLogisticChannelList> {
    return await getChannelList(this.config);
  }

  async fetchToken(authCode: string): Promise<any> {
    return await fetchTokenWithAuthCode(authCode, this.config);
  }

  async getCategory(): Promise<ShopeeResponseGetCategories> {
    return await getCategory(this.config);
  }

  async getAttributes(categoryId: number): Promise<ShopeeResponseGetAttributes> {
    return await getAttributes(categoryId, this.config);
  }

  async getBrandList(categoryId: number): Promise<ShopeeResponseGetBrandList> {
    return await getBrandList(categoryId, this.config);
  }

  async shippingParameter(orderNumber: string): Promise<ShopeeResponseShippingParameter> {
    return await shippingParameter(orderNumber, this.config);
  }

  async shipOrder(orderNumber: string, addressId: number, timeSlot: string): Promise<ShopeeResponseShipOrder> {
    return await shipOrder(orderNumber, addressId, timeSlot, this.config);
  }

  async refreshToken(): Promise<ShopeeResponseRefreshAccessToken> {
    return await fetchTokenWithRefreshToken(this.config);
  }

  async generateAuthLink() {
    // return await generateAuthLink()
  }
}
