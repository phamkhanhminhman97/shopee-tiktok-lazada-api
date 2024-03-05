import { TIKTOK_PATH_202309, TIKTOK_PATH_PLACEHOLDER } from '../../common/constant';
import * as TiktokHelper from '../../common/helper';
import { TiktokConfig } from '../../dto/request/config.request';
import { TiktokRequestActiveProduct, TiktokRequestDeactiveProduct } from '../../dto/request/product.request';
import {
  TiktokResponseActiveProduct,
  TiktokResponseAttributes,
  TiktokResponseBrands,
  TiktokResponseCategories,
  TiktokResponseCategoryRules,
  TiktokResponseDeactiveProduct,
} from '../../dto/response/product.response';

/**
 * Fetches the list of categories.
 * @param {TiktokConfig} config - Tiktok API configuration.
 * @returns {Promise<TiktokResponseCategories>} The response containing the list of categories.
 */
export async function getCategories(config: TiktokConfig): Promise<TiktokResponseCategories> {
  const timestamp = Math.floor(Date.now() / 1000);
  const commonParam = `${TiktokHelper.commonParameter2(config, timestamp)}`;
  const url = TiktokHelper.genURLwithSignature(TIKTOK_PATH_202309.CATEGORIES, commonParam, config);

  return TiktokHelper.httpGet(url, config);
}

/**
 * Fetches the list of category rules.
 * @param {string} categoryId - Category ID.
 * @param {TiktokConfig} config - Tiktok API configuration.
 * @returns {Promise<TiktokResponseCategoryRules>} The response containing the list of category rules.
 */
export async function getCategoryRules(categoryId: string, config: TiktokConfig): Promise<TiktokResponseCategoryRules> {
  if (!categoryId) {
    throw new Error('Invalid input: categoryId are required');
  }
  const timestamp = Math.floor(Date.now() / 1000);
  const commonParam = `${TiktokHelper.commonParameter2(config, timestamp)}`;
  const pathGetCategoryRule = TiktokHelper.replacePlaceholder(
    TIKTOK_PATH_202309.CATEGORY_RULE,
    TIKTOK_PATH_PLACEHOLDER.CATEGORY,
    categoryId,
  );
  const url = TiktokHelper.genURLwithSignature(pathGetCategoryRule, commonParam, config);

  return TiktokHelper.httpGet(url, config);
}

/**
 *
 * @param categoryId - Category ID.
 * @param config - Tiktok API configuration.
 * @returns {Promise<TiktokResponseBrands>} - The response containing the list of brands.
 */
export async function getBrands(categoryId: string, config: TiktokConfig): Promise<TiktokResponseBrands> {
  if (!categoryId) {
    throw new Error('Invalid input: categoryId are required');
  }
  const timestamp = Math.floor(Date.now() / 1000);
  const commonParam = `${TiktokHelper.commonParameter2(config, timestamp)}&category_id=${categoryId}&page_size=100`;
  const url = TiktokHelper.genURLwithSignature(TIKTOK_PATH_202309.BRANDS, commonParam, config);
  return TiktokHelper.httpGet(url, config);
}

/**
 *
 * @param categoryId - Category ID.
 * @param config - Tiktok API configuration.
 * @returns {Promise<TiktokResponseAttributes>} - The response containing the list of attributes.
 */
export async function getAttributes(categoryId: string, config: TiktokConfig): Promise<TiktokResponseAttributes> {
  const timestamp = Math.floor(Date.now() / 1000);
  const commonParam = `${TiktokHelper.commonParameter2(config, timestamp)}`;

  const pathGetAttributes = TiktokHelper.replacePlaceholder(TIKTOK_PATH_202309.ATTRIBUTES, TIKTOK_PATH_PLACEHOLDER.CATEGORY, categoryId);
  const url = TiktokHelper.genURLwithSignature(pathGetAttributes, commonParam, config);

  return TiktokHelper.httpGet(url, config);
}

export async function uploadProductImage(productId: string, imagePath: string, config: TiktokConfig): Promise<any> {
  const timestamp = Math.floor(Date.now() / 1000);
  const commonParam = `${TiktokHelper.commonParameter2(config, timestamp)}`;

  const path = TIKTOK_PATH_202309.PRODUCT_IMAGE + productId;
  const url = TiktokHelper.genURLwithSignature(path, commonParam, config);

  const formData = new FormData();
  formData.append('data', imagePath);

  const headers = TiktokHelper.getHeaders(config, 'multipart/form-data');
  return TiktokHelper.httpPost(url, formData, headers);
}

/**
 *
 * @param productIds - Product IDs.
 * @param config - Tiktok API configuration.
 * @returns {Promise<TiktokResponseActiveProduct>}
 */
export async function activeProduct(productIds: string[], config: TiktokConfig): Promise<TiktokResponseActiveProduct> {
  if (!productIds) {
    throw new Error('Invalid input: productIds are required');
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const commonParam = TiktokHelper.commonParameter2(config, timestamp);

  const url = TiktokHelper.genURLwithSignature(TIKTOK_PATH_202309.ACTIVE_PRODUCT, commonParam, config);

  const body: TiktokRequestActiveProduct = {
    product_ids: productIds,
  };

  const headers = TiktokHelper.getHeaders(config);

  return TiktokHelper.httpPost(url, body, headers);
}

/**
 *
 * @param productIds - Product IDs.
 * @param config - Tiktok API configuration.
 * @returns {Promise<TiktokResponseDeactiveProduct>}
 */
export async function deactiveProduct(productIds: string[], config: TiktokConfig): Promise<TiktokResponseDeactiveProduct> {
  if (!productIds) {
    throw new Error('Invalid input: productIds are required');
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const commonParam = TiktokHelper.commonParameter2(config, timestamp);

  const url = TiktokHelper.genURLwithSignature(TIKTOK_PATH_202309.DEACTIVE_PRODUCT, commonParam, config);

  const body: TiktokRequestDeactiveProduct = {
    product_ids: productIds,
  };

  const headers = TiktokHelper.getHeaders(config);

  return TiktokHelper.httpPost(url, body, headers);
}

/**
 *
 * @param productId - Product ID.
 * @param config - Tiktok API configuration.
 * @returns {Promise<any>}
 */
export async function getProductDetail(productId: string, config: TiktokConfig): Promise<any> {
  const timestamp = Math.floor(Date.now() / 1000);
  const commonParam = `${TiktokHelper.commonParameter2(config, timestamp)}&product_id=${productId}`;
  const url = TiktokHelper.genURLwithSignature(TIKTOK_PATH_202309.PRODUCT_DETAIL, commonParam, config);

  return TiktokHelper.httpGet(url, config);
}

// export async function createProduct(config) {
//   const timestamp = Math.floor(Date.now() / 1000);
//   const commonParam = commonParameter2(config, timestamp);
//   const body = {
//     // brand_id: "7082427311584347905",
//     category_id: 848648,
//     // delivery_service_ids: "1729592969712203232",
//     description:
//       'Đắp mặt nạ là một trong những bước chăm sóc đặc biệt cho da để bổ sung thêm dinh dưỡng nuôi dưỡng da kéo dài tuổi thanh xuân. Mặt nạ REAL NATURE là mặt nạ dạng miếng cot',
//     // exemption_of_identifier_code: {
//     //   exemption_reason: "1",
//     // },
//     images: [
//       {
//         id: 'tos-maliva-i-o3syd03w52-us/7804a7533ff54d2a8cba41281f6f4e5c',
//       },
//     ],
//     is_cod_open: true,
//     // outer_product_id: "172959296971220002",
//     // package_dimension_unit: "metric",
//     package_height: 12,
//     package_length: 10,
//     package_weight: '1',
//     package_width: 11,
//     // product_attributes: [
//     //   {
//     //     attribute_id: "100392",
//     //     attribute_values: [
//     //       {
//     //         value_id: "1001533",
//     //         value_name: "Birthday",
//     //       },
//     //     ],
//     //   },
//     // ],
//     // product_certifications: [
//     //   {
//     //     files: [
//     //       {
//     //         id: "tos-maliva-i-o3syd03w52-us/c668cdf70b7f483c94dbe",
//     //         name: "xxx.PDF",
//     //         type: "PDF",
//     //       },
//     //     ],
//     //     id: "123456",
//     //     images: [
//     //       {
//     //         id: "tos-maliva-i-o3syd03w52-us/c668cdf70b7f483c94dbe",
//     //       },
//     //     ],
//     //   },
//     // ],
//     product_name: 'TEST MASK MASK MASK MASK MASK',
//     // product_video: {
//     //   video_id: "v09e40f40000cfu0ovhc77ub7fl97k4w",
//     // },
//     // size_chart: {
//     //   img_id: "tos-maliva-i-o3syd03w52-us/c668cdf70b7f483c94dbe",
//     // },
//     skus: [
//       {
//         original_price: '999',
//         // outer_sku_id: "1729592969712207012",
//         // product_identifier_code: {
//         //   identifier_code: "12345678901234",
//         //   identifier_code_type: 1,
//         // },
//         // sales_attributes: [
//         //   {
//         //     attribute_id: "100089",
//         //     attribute_name: "Specification",
//         //     custom_value: "XL",
//         //     sku_img: {
//         //       id: "tos-maliva-i-o3syd03w52-us/c668cdf70b7f483c94dbe",
//         //     },
//         //     value_id: "1729592969712207000",
//         //   },
//         // ],
//         seller_sku: 'seller sku xxaa',
//         // stock_infos: [
//         //   {
//         //     available_stock: 999,
//         //     warehouse_id: "7068517275539719942",
//         //   },
//         // ],
//       },
//     ],
//   };
//   // const url = genURLwithSignature('/api/products', commonParam, config);
// }
