import roles from "./roles";

export interface IComputerRole {
  roleNumber: number;
}

export const roleComputer = (role: IComputerRole) => {
  const computerRole = roles.find(roles => roles.roleNumber === role.roleNumber);
  if (computerRole) {
    return computerRole;
  } else {
    return {
      role: 'unknown',
      roleNumber: 0
    }
  }
}