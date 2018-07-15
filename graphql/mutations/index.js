import userMutation from './user';
import roleMutation from './role';
import testimonialMutation from './testimonial';

export default (acl) => {
  const exportRoleMutation = roleMutation(acl);
  const exportUserMutation = userMutation(acl);
  return {
    ...exportUserMutation,
    ...testimonialMutation,
    ...exportRoleMutation,
  };
};
