import roles from "./roles";

export interface IComputerRole {
  role: string;
  roleNumber: number;
}

export const roleComputer = (role: number): IComputerRole => {

  const computerRole = roles.find(roles => roles.roleNumber === role);
  if (computerRole) {
    return computerRole;
  } else {
    return {
      role: 'unknown',
      roleNumber: 0
    }
  }
}