import Positivo from "./searchPositivo";
import Lenovo from "./searchLenovo";
export type IComputer = {
  brand?: string;
  patri_number?: string;
  model?: string;
  serial_number?: string;
  warranty_end?: string;
  status?: string;
  user_id_register?: number;
  error?: string;
}

export type IsearchComputer = {
  brand?: string;
  model?: string;
  warranty_end?: string;
  error?: string;
}

function Error(error: string | Error | any) {
  return error;
}
const SearchComputer = (nserie: string): Promise<IsearchComputer> => {

  if (/\d[a|A]/.test(nserie)) {
    return Positivo(nserie);
  } else if (/040|l1|pe/g.test(nserie)) {
    return Lenovo(nserie);
  } else {
    return Error('Error in computer');
  }
}

export default SearchComputer
