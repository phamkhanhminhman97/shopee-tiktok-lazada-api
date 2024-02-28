import { getOrderDetail, getOrderList } from "./api/v2/order.api";
import { TiktokConfig } from "./dto/request/config.request";
import { getAuthorizedShop } from "./api/v2/authorization.api";
import { getProductDetail } from "./api/v2/product.api";
import { getPackageShippingDocument, getPackageTimeSlots, shipPackage } from "./api/v2/fulfillment.api";
import { TiktokRequestShipPackage } from "./dto/request/fulfillment.request";
import { TIKTOK_DOCUMENT_TYPE } from "./common/constant";

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

  async getPackageTimeSlots(packageId: string) {
    return await getPackageTimeSlots(packageId, this.config);
  }

  async shipPackage(packageId: string, payload: TiktokRequestShipPackage) {
    return await shipPackage(packageId, payload, this.config);
  }

  async getShippingDocument(packageId: string, documentType: TIKTOK_DOCUMENT_TYPE) {
    return await getPackageShippingDocument(packageId, documentType, this.config);
  }
}
