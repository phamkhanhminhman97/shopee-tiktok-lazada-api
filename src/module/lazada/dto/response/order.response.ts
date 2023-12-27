interface PackageDetail {
  package_detail_info_list: [
    {
      ofc_package_id: string;
      tracking_number: string;
      logistic_detail_info_list: [
        {
          status_code: string;
          proof_images: [];
          detail_type: string;
          receive_time: number;
          description: string;
          title: string;
          event_time: number;
          package_location_name: string;
        }
      ];
    }
  ];
}

interface ResponseTraceOrder {
  result: {
    not_success: boolean;
    success: boolean;
    module: Array<PackageDetail>;
    error_code: any;
    repeated: boolean;
    retry: boolean;
  };
  code: string;
  request_id: string;
}

interface ItemList {
  order_item_id: number;
  msg: string;
  item_err_code: string;
  tracking_number: string;
  shipment_provider: string;
  package_id: string;
  retry: boolean;
}
interface PackOrder {
  order_item_list: Array<ItemList>;
  order_id: number;
}

interface ResponsePackOrder {
  result: {
    data: {
      pack_order_list: Array<PackOrder>;
    };
    success: boolean;
  };
  code: string;
  request_id: string;
}

interface PackageRTS {
  msg: string;
  item_err_code: string;
  package_id: string;
  retry: boolean;
}

interface ResponseRTSOrder {
  result: {
    data: {
      packages: Array<PackageRTS>;
    };
    success: boolean;
  };
  code: string;
  request_id: string;
}

export {
  ResponseTraceOrder as LazadaResponseTraceOrder,
  ResponsePackOrder as LazadaResponsePackOrder,
  ResponseRTSOrder as LazadaResponseRTSOrder,
};
