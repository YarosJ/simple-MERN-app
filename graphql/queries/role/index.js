import roles from './multiple';
import role from './single';

export default (acl) => {
  const Roles = roles(acl);
  const Role = role(acl);
  return { Roles, Role };
};
