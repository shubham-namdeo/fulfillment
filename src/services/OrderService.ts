import { api } from '@/adapter';
import { hasError } from '@/utils';

const findOpenOrders = async (query: any): Promise <any>  => {
  return api({
   // TODO: We can replace this with any API
    url: "solr-query", 
    method: "post",
    data: query
  });
}

const findCompletedOrders = async (query: any): Promise <any>  => {
  return api({
   // TODO: We can replace this with any API
    url: "solr-query",
    method: "post",
    data: query
  });
}

const findInProgressOrders = async (query: any): Promise <any>  => {
  return api({
    // TODO: We can replace this with any API
    url: "solr-query", 
    method: "post",
    data: query
  });
}

const packOrder = async (query: any): Promise <any> => {
  return api({
    url: "/service/packStoreFulfillmentOrder",
    method: "post",
    data: query
  })
}

const packOrders = async (query: any): Promise <any> => {
  return api({
    url: "/service/bulkPackStoreFulfillmentOrders",
    method: "post",
    data: query
  })
}

const rejectOrderItem = async (payload: any): Promise <any> => {
  return api({
    url: "rejectOrderItem",
    method: "post",
    data: payload
  });
}

const addShipmentBox = async (payload: any): Promise <any> => {
  return api({
    url: "addShipmentPackage",
    method: "post",
    data: payload
  });
}

const updateOrder = async (payload: any): Promise <any> => {
  return api({
    url: "updateOrder",
    method: "post",
    data: payload.data,
    headers: payload.headers
  })
}

const printPackingSlip = async (shipmentIds: Array<string>): Promise<any> => {
  try {
    // Get packing slip from the server
    const response: any = await api({
      method: 'get',
      url: 'PackingSlip.pdf',
      params: {
        shipmentIds
      },
      responseType: "blob"
    })

    if (!response || response.status !== 200 || hasError(response)) {
      console.error("Failed to load packing slip")
      return;
    }

    // Generate local file URL for the blob received
    const pdfUrl = window.URL.createObjectURL(response.data);
    // Open the file in new tab
    (window as any).open(pdfUrl, "_blank").focus();

  } catch(err) {
    console.error("Failed to load packing slip", err)
  }
}

export const OrderService = {
  addShipmentBox,
  findCompletedOrders,
  findInProgressOrders,
  findOpenOrders,
  packOrder,
  packOrders,
  printPackingSlip,
  rejectOrderItem,
  updateOrder
}
