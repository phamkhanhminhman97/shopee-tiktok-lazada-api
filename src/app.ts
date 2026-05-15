// // src/app.ts
// import express from "express";

// const app = express();
// const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

import { ShopeeModule } from './module/shopee';
import { LazadaModule } from './module/lazada';
import { TiktokModule } from './module/tiktokshops';

async function abc() {
  const tiktok = new TiktokModule({
    appKey: '',
    appSecret: '',
    shopId: '',
    shopCipher: '',
    accessToken: '',
  });
  const q = await tiktok.getOrderDetail('578564660786727371');
  // // const q = await tiktok.getOrderList(12);
  // // const q = await tiktok.getAuthorizedShop();
  // console.log(q);
  // const shopee = new ShopeeModule({
  //   partnerId: '',
  //   partnerKey: '',
  //   shopId: '',
  //   accessToken: '',
  // });
  // const q = await shopee.getCategory();
  console.log(q);
}
abc();

export { ShopeeModule, LazadaModule, TiktokModule };
