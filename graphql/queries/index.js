import user from './user';
import role from './role';
import testimonial from './testimonial';

export default (acl) => {
  const exportUser = user(acl);
  const exportRole = role(acl);
  return { ...exportUser, ...testimonial, ...exportRole };
};
