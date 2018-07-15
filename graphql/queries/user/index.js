import user from './single';
import users from './multiple';

export default (acl) => {
  const User = user(acl);
  const Users = users(acl);
  return { User, Users };
};
