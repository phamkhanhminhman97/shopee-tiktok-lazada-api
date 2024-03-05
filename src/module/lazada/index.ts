import { getOrderById, getOrdersBeforeSomeDay } from './api/order.api';
import { getCategoryTree, getProductItem, getProducts, updatePrice, updateSellableQuantity, updateStatusProduct } from './api/product.api';
import { LZD_UPDATE_SELLABLE_QUANTITY, LZD_UPDATE_STATUS_PRODUCT } from './dto/request/product.request';

export class LazadaModule {
  private config;
  constructor(config) {
    this.config = config;
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
}
