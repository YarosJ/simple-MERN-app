import add from './add';
import remove from './remove';

export default (acl) => {
  const addPermissions = add(acl);
  const removePermissions = remove(acl);
  return { addPermissions, removePermissions };
};
