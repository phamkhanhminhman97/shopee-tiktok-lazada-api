import { fetchTokenWithAuthCode, generateAuthLink, refreshToken } from './api/authorization.api';
import { getOrderById, getOrdersBeforeSomeDay } from './api/order.api';
import {
  createProduct,
  getBrandByPages,
  getCategoryTree,
  getProductItem,
  getProducts,
  updatePrice,
  updateSellableQuantity,
  updateStatusProduct,
} from './api/product.api';
import { LazadaConfig } from './dto/request/config.request';
import { LZD_UPDATE_SELLABLE_QUANTITY, LZD_UPDATE_STATUS_PRODUCT } from './dto/request/product.request';
import { LazadaResponseAccessToken } from './dto/response/config.response';

export class LazadaModule {
  private config: LazadaConfig;
  constructor(config) {
    this.config = config;
  }

  setConfig(config: LazadaConfig) {
    this.config.appAccessToken = config.appAccessToken;
    this.config.refreshToken = config.refreshToken;
    this.config.expiresIn = config.expiresIn;
    this.config.refreshExpiresIn = config.refreshExpiresIn;
  }

  getConfig() {
    return this.config;
  }

  async getOrdersBeforeSomeDay() {
    return await getOrdersBeforeSomeDay(this.config);
  }

  async getOrderDetail(orderNumber: string) {
    return await getOrderById(this.config, orderNumber);
  }

  async getProducts() {
    return await getProducts(this.config);
  }

  async getProductItem(itemId: number) {
    return await getProductItem(this.config, itemId);
  }

  async updateSellableQuantity(itemId: number, payload: LZD_UPDATE_SELLABLE_QUANTITY) {
    return await updateSellableQuantity(this.config, itemId, [payload]);
  }

  async updateStatusProduct(itemId: number, payload: LZD_UPDATE_STATUS_PRODUCT) {
    return await updateStatusProduct(this.config, itemId, [payload]);
  }

  async updatePrice(itemId: number, payload: any) {
    return await updatePrice(this.config, itemId, [payload]);
  }

  async getCategoryTree() {
    return await getCategoryTree(this.config);
  }

  generateAuthLink(redirectURL: string, appKey: string, uuid: string) {
    return generateAuthLink(redirectURL, appKey, uuid);
  }

  async fetchTokenWithAuthCode(authCode: string, uuid: string): Promise<LazadaResponseAccessToken> {
    return fetchTokenWithAuthCode(authCode, uuid, this.config);
  }

  async createProduct(payload) {
    return createProduct(payload, this.config);
  }

  async refreshToken() {
    return refreshToken(this.config);
  }

  async getBrands() {
    return getBrandByPages(this.config);
  }
}
