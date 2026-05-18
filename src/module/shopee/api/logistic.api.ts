import * as ShopeeHelper from '../common/helper';
import { SHOPEE_END_POINT, SHOPEE_PATH } from '../common/constant';
import { ShopeeConfig } from '../dto/request/config.request';
import {
  ShopeeResponseLogisticChannelList,
  ShopeeResponseShipOrder,
  ShopeeResponseShippingParameter,
  ShopeeResponseTrackingNumber,
  ShopeeResponseCreateShippingDocument,
  ShopeeResponseGetShippingDocumentResult,
  ShopeeResponseTrackingInfo,
  ShopeeResponseMassShipOrder,
  ShopeeResponseGetMassShippingParameter,
  ShopeeResponseUpdateShippingOrder,
  ShopeeResponseGetMassTrackingNumber,
  ShopeeResponseGetShippingDocumentParameter,
  ShopeeResponseGetAddressList,
} from '../dto/response/logistic.reponse';
import {
  ShopeeRequestShipOrder,
  ShopeeRequestCreateShippingDocument,
  ShopeeRequestGetShippingDocumentResult,
  ShopeeRequestDownloadShippingDocument,
  ShopeeRequestMassShipOrder,
  ShopeeRequestGetMassShippingParameter,
  ShopeeRequestUpdateShippingOrder,
  ShopeeRequestGetMassTrackingNumber,
  ShopeeRequestGetShippingDocumentParameter,
} from '../dto/request/logistic.request';

/**
 *
 * @param itemIds - Product IDs.
 * @param statusUnlist - Unlist status.
 * @param config - Shopee API configuration.
 * @returns {Promise<ShopeeResponseGetCategories>}
 */
export async function getChannelList(config: ShopeeConfig): Promise<ShopeeResponseLogisticChannelList> {
  const timestamp = ShopeeHelper.getTimestampNow();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.CHANNEL_LIST, config, timestamp);
  const commonParam = ShopeeHelper.commonParameter(config, signature, timestamp);

  const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.CHANNEL_LIST}${commonParam}`;
  return ShopeeHelper.httpGet(url, config);
}

/**
 *
 * @param orderNumber - Order number.
 * @param config - Shopee API configuration.
 * @returns {Promise<ShopeeResponseGetCategories>}
 */
export async function shippingParameter(orderNumber: string, config: ShopeeConfig): Promise<ShopeeResponseShippingParameter> {
  const timestamp = ShopeeHelper.getTimestampNow();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.SHIPPING_PARAMS, config, timestamp);

  const additionalParams = {
    order_sn: orderNumber,
  };
  const commonParam = ShopeeHelper.buildCommonParams(config, signature, timestamp, additionalParams);
  const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.SHIPPING_PARAMS}${commonParam}`;

  return ShopeeHelper.httpGet(url, config);
}

/**
 *
 * @param orderNumber - Order number.
 * @param config - Shopee API configuration.
 * @returns {Promise<ShopeeResponseShipOrder>}
 */
export async function shipOrder(
  orderNumber: string,
  addressId: number,
  timeSlot: string,
  config: ShopeeConfig,
): Promise<ShopeeResponseShipOrder> {
  const timestamp = ShopeeHelper.getTimestampNow();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.SHIP_ORDER, config, timestamp);

  const commonParam = ShopeeHelper.buildCommonParams(config, signature, timestamp);

  const body: ShopeeRequestShipOrder = {
    order_sn: orderNumber,
    pickup: {
      address_id: addressId,
      pickup_time_id: timeSlot,
    },
  };

  const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.SHIP_ORDER}${commonParam}`;

  return ShopeeHelper.httpPost(url, body, config);
}

/**
 *
 * @param orderNumber - Order number.
 * @param config - Shopee API configuration.
 * @param packageNumber - Package number (optional).
 * @param responseOptionalFields - Optional response fields (optional).
 * @returns {Promise<ShopeeResponseTrackingNumber>}
 */
export async function getTrackingNumber(
  orderNumber: string,
  config: ShopeeConfig,
  packageNumber?: string,
  responseOptionalFields?: string,
): Promise<ShopeeResponseTrackingNumber> {
  const timestamp = ShopeeHelper.getTimestampNow();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.TRACKING_NUMBER, config, timestamp);

  const additionalParams: any = {
    order_sn: orderNumber,
  };
  if (packageNumber) {
    additionalParams.package_number = packageNumber;
  }
  if (responseOptionalFields) {
    additionalParams.response_optional_fields = responseOptionalFields;
  }

  const commonParam = ShopeeHelper.buildCommonParams(config, signature, timestamp, additionalParams);
  const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.TRACKING_NUMBER}${commonParam}`;

  return ShopeeHelper.httpGet(url, config);
}

/**
 *
 * @param body - The payload for creating shipping document.
 * @param config - Shopee API configuration.
 * @returns {Promise<ShopeeResponseCreateShippingDocument>}
 */
export async function createShippingDocument(
  body: ShopeeRequestCreateShippingDocument,
  config: ShopeeConfig,
): Promise<ShopeeResponseCreateShippingDocument> {
  const timestamp = ShopeeHelper.getTimestampNow();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.CREATE_SHIPPING_DOCUMENTS, config, timestamp);

  const commonParam = ShopeeHelper.buildCommonParams(config, signature, timestamp);
  const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.CREATE_SHIPPING_DOCUMENTS}${commonParam}`;

  return ShopeeHelper.httpPost(url, body, config);
}

/**
 *
 * @param body - The payload for getting shipping document result.
 * @param config - Shopee API configuration.
 * @returns {Promise<ShopeeResponseGetShippingDocumentResult>}
 */
export async function getShippingDocumentResult(
  body: ShopeeRequestGetShippingDocumentResult,
  config: ShopeeConfig,
): Promise<ShopeeResponseGetShippingDocumentResult> {
  const timestamp = ShopeeHelper.getTimestampNow();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.GET_SHIPPING_DOCUMENTS, config, timestamp);

  const commonParam = ShopeeHelper.buildCommonParams(config, signature, timestamp);
  const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.GET_SHIPPING_DOCUMENTS}${commonParam}`;

  return ShopeeHelper.httpPost(url, body, config);
}

/**
 *
 * @param body - The payload for downloading shipping document.
 * @param config - Shopee API configuration.
 * @returns {Promise<any>} The waybill file buffer or error object.
 */
export async function downloadShippingDocument(
  body: ShopeeRequestDownloadShippingDocument,
  config: ShopeeConfig,
): Promise<any> {
  const timestamp = ShopeeHelper.getTimestampNow();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.DOWNLOAD_SHIPPING_DOCUMENT, config, timestamp);

  const commonParam = ShopeeHelper.buildCommonParams(config, signature, timestamp);
  const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.DOWNLOAD_SHIPPING_DOCUMENT}${commonParam}`;
  const headers = ShopeeHelper.getHeaders(config);

  return ShopeeHelper.httpPostDownload(url, body, headers);
}

/**
 *
 * @param orderNumber - Order number.
 * @param config - Shopee API configuration.
 * @param packageNumber - Package number (optional).
 * @returns {Promise<ShopeeResponseTrackingInfo>}
 */
export async function getTrackingInfo(
  orderNumber: string,
  config: ShopeeConfig,
  packageNumber?: string,
): Promise<ShopeeResponseTrackingInfo> {
  const timestamp = ShopeeHelper.getTimestampNow();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.TRACKING_INFO, config, timestamp);

  const additionalParams: any = {
    order_sn: orderNumber,
  };
  if (packageNumber) {
    additionalParams.package_number = packageNumber;
  }

  const commonParam = ShopeeHelper.buildCommonParams(config, signature, timestamp, additionalParams);
  const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.TRACKING_INFO}${commonParam}`;

  return ShopeeHelper.httpGet(url, config);
}

/**
 *
 * @param body - The payload for mass shipping order.
 * @param config - Shopee API configuration.
 * @returns {Promise<ShopeeResponseMassShipOrder>}
 */
export async function massShipOrder(
  body: ShopeeRequestMassShipOrder,
  config: ShopeeConfig,
): Promise<ShopeeResponseMassShipOrder> {
  const timestamp = ShopeeHelper.getTimestampNow();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.MASS_SHIP_ORDER, config, timestamp);

  const commonParam = ShopeeHelper.buildCommonParams(config, signature, timestamp);
  const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.MASS_SHIP_ORDER}${commonParam}`;

  return ShopeeHelper.httpPost(url, body, config);
}

/**
 *
 * @param body - The payload for getting mass shipping parameter.
 * @param config - Shopee API configuration.
 * @returns {Promise<ShopeeResponseGetMassShippingParameter>}
 */
export async function getMassShippingParameter(
  body: ShopeeRequestGetMassShippingParameter,
  config: ShopeeConfig,
): Promise<ShopeeResponseGetMassShippingParameter> {
  const timestamp = ShopeeHelper.getTimestampNow();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.MASS_SHIPPING_PARAMS, config, timestamp);

  const commonParam = ShopeeHelper.buildCommonParams(config, signature, timestamp);
  const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.MASS_SHIPPING_PARAMS}${commonParam}`;

  return ShopeeHelper.httpPost(url, body, config);
}

/**
 *
 * @param body - The payload for updating shipping order.
 * @param config - Shopee API configuration.
 * @returns {Promise<ShopeeResponseUpdateShippingOrder>}
 */
export async function updateShippingOrder(
  body: ShopeeRequestUpdateShippingOrder,
  config: ShopeeConfig,
): Promise<ShopeeResponseUpdateShippingOrder> {
  const timestamp = ShopeeHelper.getTimestampNow();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.UPDATE_SHIPPING_ORDER, config, timestamp);

  const commonParam = ShopeeHelper.buildCommonParams(config, signature, timestamp);
  const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.UPDATE_SHIPPING_ORDER}${commonParam}`;

  return ShopeeHelper.httpPost(url, body, config);
}

/**
 *
 * @param body - The payload for getting mass tracking number.
 * @param config - Shopee API configuration.
 * @returns {Promise<ShopeeResponseGetMassTrackingNumber>}
 */
export async function getMassTrackingNumber(
  body: ShopeeRequestGetMassTrackingNumber,
  config: ShopeeConfig,
): Promise<ShopeeResponseGetMassTrackingNumber> {
  const timestamp = ShopeeHelper.getTimestampNow();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.MASS_TRACKING_NUMBER, config, timestamp);

  const commonParam = ShopeeHelper.buildCommonParams(config, signature, timestamp);
  const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.MASS_TRACKING_NUMBER}${commonParam}`;

  return ShopeeHelper.httpPost(url, body, config);
}

/**
 *
 * @param body - The payload for getting shipping document parameters.
 * @param config - Shopee API configuration.
 * @returns {Promise<ShopeeResponseGetShippingDocumentParameter>}
 */
export async function getShippingDocumentParameter(
  body: ShopeeRequestGetShippingDocumentParameter,
  config: ShopeeConfig,
): Promise<ShopeeResponseGetShippingDocumentParameter> {
  const timestamp = ShopeeHelper.getTimestampNow();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.GET_SHIPPING_DOCUMENT_PARAMETER, config, timestamp);

  const commonParam = ShopeeHelper.buildCommonParams(config, signature, timestamp);
  const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.GET_SHIPPING_DOCUMENT_PARAMETER}${commonParam}`;

  return ShopeeHelper.httpPost(url, body, config);
}

/**
 *
 * @param config - Shopee API configuration.
 * @returns {Promise<ShopeeResponseGetAddressList>}
 */
export async function getAddressList(config: ShopeeConfig): Promise<ShopeeResponseGetAddressList> {
  const timestamp = ShopeeHelper.getTimestampNow();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.ADDRESS_LIST, config, timestamp);
  const commonParam = ShopeeHelper.commonParameter(config, signature, timestamp);

  const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.ADDRESS_LIST}${commonParam}`;
  return ShopeeHelper.httpGet(url, config);
}
