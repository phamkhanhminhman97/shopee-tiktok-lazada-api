# shopee-tiktokshops-lazada-api

<p align="center">
  Unified TypeScript SDK for <b>Shopee</b>, <b>TikTok Shop</b>, and <b>Lazada</b> APIs.
</p>

<p align="center">
  <a href="https://badge.fury.io/js/shopee-tiktokshops-lazada-api"><img src="https://badge.fury.io/js/shopee-tiktokshops-lazada-api.svg" alt="npm version" /></a>
  <a href="https://opensource.org/licenses/ISC"><img src="https://img.shields.io/badge/License-ISC-blue.svg" alt="License ISC" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-Ready-blue.svg" alt="TypeScript" /></a>
</p>

---

## Why this package?

- One consistent interface for 3 major marketplaces.
- Strong TypeScript typings for safer integrations.
- Production-focused methods for orders, products, shipping, and auth.

## Install

```bash
npm install shopee-tiktokshops-lazada-api
# or
yarn add shopee-tiktokshops-lazada-api
```

## Quick Start

### Shopee

```ts
import { ShopeeModule } from 'shopee-tiktokshops-lazada-api';

const shopee = new ShopeeModule({
  partnerId: 1234567890,
  partnerKey: 'YOUR_PARTNER_KEY',
  shopId: 'YOUR_SHOP_ID',
  accessToken: 'YOUR_ACCESS_TOKEN',
});
```

### TikTok Shop

```ts
import { TiktokModule } from 'shopee-tiktokshops-lazada-api';

const tiktok = new TiktokModule({
  appKey: 'YOUR_APP_KEY',
  appSecret: 'YOUR_APP_SECRET',
  shopId: 'YOUR_SHOP_ID',
  shopCipher: 'YOUR_SHOP_CIPHER',
  accessToken: 'YOUR_ACCESS_TOKEN',
});
```

### Lazada

```ts
import { LazadaModule } from 'shopee-tiktokshops-lazada-api';

const lazada = new LazadaModule({
  appKey: 'YOUR_APP_KEY',
  appSecret: 'YOUR_APP_SECRET',
  shopId: 'YOUR_SHOP_ID',
  appAccessToken: 'YOUR_ACCESS_TOKEN',
});
```

## Available Methods

### Shopee

`getOrders`, `getOrderDetail`, `getShipmentList`, `getProductItemList`, `getProductItemBaseInfo`, `updateStock`, `unListItem`, `updatePrice`, `addItem`, `getChannelList`, `fetchToken`, `getCategory`, `getAttributes`, `getBrandList`, `shippingParameter`, `shipOrder`

### TikTok Shop

`getOrderList`, `getOrderDetail`, `getProductDetail`, `getAuthorizedShop`, `getPackageTimeSlots`, `shipPackage`, `getShippingDocument`, `getCategories`, `getBrands`, `getAttributes`, `createProduct`

### Lazada

Core APIs for authorization, orders, and products are available via `LazadaModule`.

## Contact

- Email: **phamkhanhminhman97@gmail.com**
- Skype: **phamkhanhminhman97@gmail.com**

---

<p align="center"><i>Built for fast multi-channel commerce integrations.</i></p>
