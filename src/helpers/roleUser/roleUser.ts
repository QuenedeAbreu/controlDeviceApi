
import usersRole from './roles';

export interface IUserRole {
  dn?: string; // DN
  distinguishedName?: string; //distinguishedName
  userPrincipalName?: string; //userPrincipalName
  sAMAccountName?: string; //sAMAccountName
  whenCreated?: string; //whenCreated
  pwdLastSet?: string; //pwdLastSet
  userAccountControl?: string; //userAccountControl
  sn?: string; //sn
  givenName?: string; //givenName 
  initials?: string; //initials 
  cn?: string; //cn 
  displayName?: string; //displayName
}

export function roleUser(UserLdap: IUserRole) {
  const userRole = usersRole.find(user => user.user === UserLdap.sAMAccountName);
  if (userRole) {
    return userRole;
  } else {
    return {
      user: UserLdap.sAMAccountName,
      role: 'user',
      roleNumber: 2
    }
  }

}

