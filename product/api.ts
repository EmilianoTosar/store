import axios from "axios"
import Papa from "papaparse"

import { Product } from "./types"

export default {
  list: async (): Promise<Product[]> => {
    return axios
      .get(
        `https://docs.google.com/spreadsheets/d/e/2PACX-1vTvXNkv5UYvEpt7p7Tb2_6KyeWSunfDUriC52DwHZv9DZa84RWV8VsjusJnRWRT7juAj1v0Qk7IX_-5/pub?output=csv`,
        {
          responseType: 'blob'
        }
      )
      .then(
        (response) => 
          new Promise<Product[]>((resolve, reject) => {
            Papa.parse(response.data, {
              header: true,
              complete: (results) => {
                const products = results.data as Product[]

                return resolve(
                  products.map((product) => ({
                    ...product,
                    price: Number(product.price)
                  })),
                );
              },
              error: (error) => reject(error.message)
            })
          })
      )        
  },
  mock: {
    list: (mock: string): Promise<Product[]> => import(`./mocks/${mock}.json`).then(result => result.default)
  }
}