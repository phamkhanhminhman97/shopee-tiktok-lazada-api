# 🛍️ shopee-tiktokshops-lazada-api

[![npm version](https://badge.fury.io/js/shopee-tiktokshops-lazada-api.svg)](https://badge.fury.io/js/shopee-tiktokshops-lazada-api)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A unified, strongly-typed Open API wrapper for **Shopee**, **TikTok Shop**, and **Lazada** built with TypeScript. Simplify e-commerce integrations and manage your multi-channel stores efficiently.

---

## ✨ What's New in v4.2.0

This release completes the **Shopee Logistics Open API v2 Suite** integration, enabling robust, multi-warehouse, and bulk fulfillment capability.

### 🛒 Shopee Logistics & Fulfillment Suite Integration
- **Advanced Bulk Operations:**
  - **`massShipOrder`**: Arrange batch logistics (pickup, dropoff, non-integrated) for multiple orders concurrently.
  - **`getMassShippingParameter`**: Fetch available addresses, dropoff branches, and recommended time slots for bulk orders under the same location/channel.
  - **`getMassTrackingNumber`**: Batch fetch tracking numbers from Shopee 3PLs asynchronously.
  - **`getShippingDocumentParameter`**: Query selectable and Shopee-suggested document formats (thermal/normal airwaybills).
- **Single Fulfillment & Tracking:**
  - **`getTrackingNumber`**: Retrieve the 3PL-generated tracking number for single-order packages.
  - **`getTrackingInfo`**: Get comprehensive real-time tracking logs and reversed logistics history.
  - **`updateShippingOrder`**: Reschedule pickup details (address ID and time slot ID) for active shipments.
  - **`getAddressList`**: Query active merchant shop addresses.
- **Waybills & Documents Handling:**
  - **`createShippingDocument`**: Asynchronously trigger document generation tasks.
  - **`getShippingDocumentResult`**: Track the compilation progress of airwaybill tasks.
  - **`downloadShippingDocument`**: Direct binary stream download (`arraybuffer`) to fetch generated waybills as buffer outputs.

---

## ✨ What's New in v4.1.0

This update focuses on performance optimization, pagination bug fixes, and adding the latest data fields from Shopee Open API v2.

### 🛒 Shopee Module Improvements
- **Fix Data Shifting Bug:** Resolved a critical issue where orders could be duplicated or missed during pagination because the query time window shifted between loop iterations.
- **`getOrders` Enhancements:**
  - Optimized `page_size` to 100 (reducing HTTP requests by 50%).
  - Added a 15-day time range validation as required by Shopee.
- **`getOrderDetail` Enhancements:**
  - Support for fetching multiple orders simultaneously by passing a `string[]`.
  - Added the latest response fields: `return_request_due_date`, `edt`, `payment_info`, `international_label`.
  - Added support for the `PENDING` order status (via `request_order_status_pending`).
- **New Feature `getShipmentList`:** Added a dedicated API to retrieve orders ready for fulfillment (`READY_TO_SHIP`) or those requiring a retry (`RETRY_SHIP`).
- **Enhanced Error Handling:** The system now explicitly catches Shopee API errors and returns detailed error messages instead of silently returning an empty result.

---

## ⚡️ Installation

You can install the package via `npm` or `yarn`:

```bash
# Using npm
npm install shopee-tiktokshops-lazada-api

# Using yarn
yarn add shopee-tiktokshops-lazada-api
```

## 🚀 Usage

### 🛒 Shopee Module

```typescript
import { ShopeeModule } from 'shopee-tiktokshops-lazada-api';

const shopee = new ShopeeModule({
  partnerId: 1234567890,
  partnerKey: 'YOUR_PARTNER_KEY',
  shopId: 'YOUR_SHOP_ID',
  accessToken: 'YOUR_ACCESS_TOKEN',
});
```

**Supported Methods:**

| Function                       | Status  |
| ------------------------------ | ------- |
| `getOrders`                    | ✅ Done |
| `getOrderDetail`               | ✅ Done |
| `getShipmentList`              | ✅ Done |
| `getProductItemList`           | ✅ Done |
| `getProductItemBaseInfo`       | ✅ Done |
| `updateStock`                  | ✅ Done |
| `unListItem`                   | ✅ Done |
| `updatePrice`                  | ✅ Done |
| `addItem`                      | ✅ Done |
| `getChannelList`               | ✅ Done |
| `fetchToken`                   | ✅ Done |
| `getCategory`                  | ✅ Done |
| `getAttributes`                | ✅ Done |
| `getBrandList`                 | ✅ Done |
| `shippingParameter`            | ✅ Done |
| `shipOrder`                    | ✅ Done |
| `getTrackingNumber`            | ✅ Done |
| `createShippingDocument`       | ✅ Done |
| `getShippingDocumentResult`    | ✅ Done |
| `downloadShippingDocument`     | ✅ Done |
| `getTrackingInfo`              | ✅ Done |
| `massShipOrder`                | ✅ Done |
| `getMassShippingParameter`     | ✅ Done |
| `updateShippingOrder`          | ✅ Done |
| `getMassTrackingNumber`        | ✅ Done |
| `getShippingDocumentParameter` | ✅ Done |
| `getAddressList`               | ✅ Done |

---

### 🎵 TikTok Shop Module (v2 2309)

```typescript
import { TiktokModule } from 'shopee-tiktokshops-lazada-api';

const tiktok = new TiktokModule({
  appKey: 'YOUR_APP_KEY',
  appSecret: 'YOUR_APP_SECRET',
  shopId: 'YOUR_SHOP_ID',
  shopCipher: 'YOUR_SHOP_CIPHER',
  accessToken: 'YOUR_ACCESS_TOKEN',
});
```

**Supported Methods:**

| Function              | Status |
| --------------------- | ------ |
| `getOrderList`        | ✅ Done |
| `getOrderDetail`      | ✅ Done |
| `getProductDetail`    | ✅ Done |
| `getAuthorizedShop`   | ✅ Done |
| `getPackageTimeSlots` | ✅ Done |
| `shipPackage`         | ✅ Done |
| `getShippingDocument` | ✅ Done |
| `getCategories`       | ✅ Done |
| `getBrands`           | ✅ Done |
| `getAttributes`       | ✅ Done |
| `createProduct`       | ✅ Done |

---

### 🛍 Lazada Module

```typescript
import { LazadaModule } from 'shopee-tiktokshops-lazada-api';

const lazada = new LazadaModule({
  appKey: 'YOUR_APP_KEY',
  appSecret: 'YOUR_APP_SECRET',
  shopId: 'YOUR_SHOP_ID',
  appAccessToken: 'YOUR_ACCESS_TOKEN',
});
```

---



## 📬 Contact / Hỗ trợ

- **Email:** phamkhanhminhman97@gmail.com
- **Skype:** phamkhanhminhman97@gmail.com

---
*Built with ❤️ for E-commerce Integrations. To be continued...*
