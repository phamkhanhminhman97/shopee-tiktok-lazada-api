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

import { ShopeeModule } from "./module/shopee";
import { LazadaModule } from "./module/lazada";
import { TiktokModule } from "./module/tiktokshops";

export { 
  ShopeeModule,
  LazadaModule,
  TiktokModule
}