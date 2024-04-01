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
    appKey: '442vlg',
    appSecret: 'aeb80391c36d80a6c460277983f7584118ea0074',
    shopId: '7494624376520870030',
    shopCipher: 'ROW_KxYFtgAAAAAqRrwsGdEZ-7biTiTk4umd',
    accessToken:
      'ROW__oLE0AAAAACzIAG8U_0FkU_GTAUfoc4PhJg09WK8ahcVyt_FgPPYO4op5GjYDP8rcPy1_05ijf4iI-Ple1U09L27iXVMorelUGSIThC7z3b0I7cNlIx0TlUaKuwPwQRS6M2Qh7Xe-DOzHTxPrlUtAaqA62Lqm-2bIcHFc9bzG6bnvVnoPzgaag',
  });
  const q = await tiktok.getOrderDetail('578564660786727371');
  // // const q = await tiktok.getOrderList(12);
  // // const q = await tiktok.getAuthorizedShop();
  // console.log(q);
  // const shopee = new ShopeeModule({
  //   partnerId: '844790',
  //   partnerKey: '3cd1415408cc1165f1b470423bdf849d3a88993058e3aa5ea504d37bc1694ea5',
  //   shopId: '29935989',
  //   accessToken: '736272447172514f784e647171645543',
  // });
  // const q = await shopee.getCategory();
  console.log(q);
}
abc();

export { ShopeeModule, LazadaModule, TiktokModule };
