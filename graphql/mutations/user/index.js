import add from './add';
import remove from './remove';
import update from './update';

export default (acl) => {
  const addUser = add(acl);
  const removeUser = remove(acl);
  const updateUser = update(acl);
  return { addUser, removeUser, updateUser };
};
