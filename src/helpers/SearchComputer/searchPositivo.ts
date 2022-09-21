import axios from "axios";  // Importamos axios
import cherio from "cheerio"; // import cheerio 

export type IPositivo = {
  brand?: string;
  model?: string;
  warranty_end?: string;
  error?: string;
};


const Positivo = async (nserie: string): Promise<IPositivo> => {
  try {
    const formData = new URLSearchParams();
    const url = `http://wwwo.positivoinformatica.com.br/suportepositivo/consultagarantia/default.asp`; // URL da pagina positivo
    nserie = nserie.toLocaleLowerCase()

    formData.append("nserie", nserie.toLocaleLowerCase());
    const response = await axios.post(url, formData); // Enviamos os dados para a pagina
    const $ = cherio.load(response.data); // Carregamos o html da pagina
    // Pegamos o resultado da consulta
    const htmlString: String = $(".PositivoFormAviso").text();
    if (!htmlString.includes('POSITIVO ')) {
      return {
        error: 'Error in computer'
      }
    }
    // Informações do computador
    const computerInfo: Array<String> = htmlString.split(nserie)[1].split('\n')[0].trim().split(' ');
    //garatia do computador
    const computerWarranty: Array<String> = htmlString.split(nserie)[1].split('\n')[1].trim().split(' ');


    return {
      brand: htmlString.includes('POSITIVO ') ? 'POSITIVO' : 'N/A',
      model: computerInfo[1] + ' ' + computerInfo[2],
      warranty_end: computerWarranty[4] as string,
    };
  } catch (error: String | Error | any) {
    console.log(error);
    return error;

  }

}

export default Positivo;