interface UpdateSellableQuantity {
  itemId: string;
  skuId: string;
  sellerSku?: string;
  quantity: number;
}

interface UpdateStatusProduct {
  itemId: string;
  skuId: string;
  sellerSku?: string;
  status: any;
}

export {
  UpdateSellableQuantity as LZD_UPDATE_SELLABLE_QUANTITY,
  UpdateStatusProduct as LZD_UPDATE_STATUS_PRODUCT,
};
