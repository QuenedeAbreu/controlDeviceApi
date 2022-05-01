import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

type User = {
  username: string;
  password?: string;
}


export const authenticateLdap = async (user: User) => {
  const { username, password } = user;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'secret_key': process.env.JWT_SECRET as string
    }
  };

  try {
    const ldap = await axios.post(`${process.env.HOST_ALL}:${process.env.PORT}/api/ldap/auth`, { username, password }, config)

    if (ldap.data.auth) {
      return {
        auth: ldap.data.auth,
        user: ldap.data.user,
        status: ldap.status
      }
    } else {
      return {
        auth: ldap.data.auth,
        user: ldap.data.user,
        status: ldap.status
      }
    }

  } catch (error) {
    // console.log(error);
    return {
      auth: false,
      user: null,
      status: 401,
      error
    }
  }
}