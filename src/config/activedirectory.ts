import ActiveDirectory from 'activedirectory2';
import dotenv from 'dotenv';

dotenv.config();


const config = {
  url: process.env.AD_URL as string, // IP e porta do servidor AD Ex: ldap://XXX.XXX.XXX.XXX:XXX
  baseDN: process.env.DOMAIN_CONTROLLER as string, //nome do domínio, exemplo: teste.local
  username: process.env.AD_USERNAME as string, // usuário do AD para configuração de acesso
  password: process.env.AD_PASSWORD as string, // senha do usuário
}
// console.log(config);
export const ad = new ActiveDirectory(config);
