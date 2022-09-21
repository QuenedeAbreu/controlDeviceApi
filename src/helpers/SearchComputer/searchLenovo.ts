import axios from "axios"; // Importamos axios

export type ILenovo = {
  brand?: string;
  model?: string;
  warranty_end?: string;
  error?: string;
}
const cleanId = (id: string) => {
  var model = id.replace(/LENOVO|-/g, ' ').trim();
  return model;
}


const Lenovo = async (nserie: string): Promise<ILenovo> => {

  try {
    const urls = [
      `https://www.lenovo.com/br/pt//warranty/${nserie}?machineType=`,
      `https://pcsupport.lenovo.com/br/pt//api/v4/mse/getproducts?productId=${nserie}`,
    ]
    const url1 = await axios.get(urls[0])
    const url2 = await axios.get(urls[1])

    const [lenovoWarranty, lenovoInfo] = await axios.all([url1, url2]);

    if (lenovoInfo.data.length === 0) {
      return {
        error: 'Error in computer'
      }
    } else {
      return {
        brand: 'LENOVO',
        model: cleanId(lenovoInfo.data[0].Id.split("/")[2]),
        warranty_end: lenovoWarranty.data.expirationDate
      };
    }
  } catch (error: String | Error | any) {
    console.log(error);
    return error;
  }
}

export default Lenovo;