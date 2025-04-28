import API_3RD from "api/3rd-api";
import axios from "axios";
import { IOrderV2 } from "interface";
import queryString from "query-string";

export class LoggerOrderHelper {
  private static axiosInstance = axios.create({
    baseURL: API_3RD.API_NODE,
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    paramsSerializer: {
      encode: (param: string) => { },
      serialize: (params) => queryString.stringify(params),
      indexes: false,
    },
  })
  static async log(order: IOrderV2) {
    try {
      await this.axiosInstance.post('/notifications/order', { order })
    } catch (error) {
      console.log(error)
    }
  }
}