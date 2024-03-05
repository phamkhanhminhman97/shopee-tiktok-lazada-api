import { getOrderDetail, getOrderList } from './api/v2/order.api';
import { TiktokConfig } from './dto/request/config.request';
import { getAuthorizedShop } from './api/v2/authorization.api';
import { getAttributes, getBrands, getCategories, getProductDetail } from './api/v2/product.api';
import { getPackageShippingDocument, getPackageTimeSlots, shipPackage } from './api/v2/fulfillment.api';
import { TiktokRequestShipPackage } from './dto/request/fulfillment.request';
import { TIKTOK_DOCUMENT_TYPE } from './common/constant';
import { TiktokResponseAttributes, TiktokResponseBrands, TiktokResponseCategories } from './dto/response/product.response';
import { TiktokResponseAuthorized } from './dto/response/config.response';
import { TiktokResponsePackageTimeSlot } from './dto/response/fulfillment.response';
import { TiktokResponseOrderDetail } from './dto/response/order.response';

export class TiktokModule {
  private config: TiktokConfig;
  constructor(config: TiktokConfig) {
    this.config = config;
  }

  async getOrderList(beforeHours: number): Promise<any> {
    return await getOrderList(beforeHours, this.config);
  }

  async getOrderDetail(orderNumber: string): Promise<TiktokResponseOrderDetail> {
    return await getOrderDetail(orderNumber, this.config);
  }

  async getProductDetail(productId: string): Promise<any> {
    return await getProductDetail(productId, this.config);
  }

  async getAuthorizedShop(): Promise<TiktokResponseAuthorized> {
    return await getAuthorizedShop(this.config);
  }

  async getPackageTimeSlots(packageId: string): Promise<TiktokResponsePackageTimeSlot> {
    return await getPackageTimeSlots(packageId, this.config);
  }

  async shipPackage(packageId: string, payload: TiktokRequestShipPackage) {
    return await shipPackage(packageId, payload, this.config);
  }

  async getShippingDocument(packageId: string, documentType: TIKTOK_DOCUMENT_TYPE): Promise<any> {
    return await getPackageShippingDocument(packageId, documentType, this.config);
  }

  async getCategories(): Promise<TiktokResponseCategories> {
    return await getCategories(this.config);
  }

  async getBrands(categoryId: string): Promise<TiktokResponseBrands> {
    return await getBrands(categoryId, this.config);
  }

  async getAttributes(categoryId: string): Promise<TiktokResponseAttributes> {
    return await getAttributes(categoryId, this.config);
  }
}
