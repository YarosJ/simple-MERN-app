import deasyncPromise from 'deasync-promise';

/**
 * Configure ACL and seed DB for default roles
 * @param myAcl
 */

export default function (myAcl) {
  const debugACL = require('debug')('acl');

  /**
   * Default permissions for roles
   * @type {*[]}
   */

  const allows = [
    {
      roles: ['guest'],
      allows: [
        { resources: ['/', '/testimonials/'], permissions: 'GET' },
      ],
    },
    {
      roles: ['user'],
      allows: [
        { resources: ['/roles/', '/users/'], permissions: ['GET'] },
      ],
    },
    {
      roles: ['admin'],
      allows: [
        {
          resources: ['/roles/:role/permissions'], permissions: ['GET'],
        },
        {
          resources: ['/users/:id', '/testimonials/', '/testimonials/:id', '/roles/',
            '/roles/:role/resources/:resource', '/roles/:role/resources/:resource/permissions/:permission'],
          permissions: ['PUT', 'DELETE', 'POST'],
        },
      ],
    },
    {
      roles: ['superAdmin'],
      allows: [
        { resources: '/users/:id', permissions: ['PUT'] },
      ],
    },
  ];

  /**
   * Add default permissions to roles and they inheritance
   */

  myAcl.allow(allows, (err) => {
    debugACL('Structure of ACL:');
    debugACL(JSON.stringify(allows, null, 1));
    debugACL('Inheritance:');

    if (!err) {
      allows.reduce((accumulator, currentValue) => {
        deasyncPromise(myAcl.addRoleParents(currentValue.roles[0], accumulator.roles[0]));
        debugACL('Role:', currentValue.roles[0], 'inherited from:', accumulator.roles[0]);
        return currentValue;
      });
    }

    debugACL('ACL successfully configured!');
  });

  /**
   * Set id for guest role (for acl middleware)
   */

  myAcl.addUserRoles('guest123456789abcdefghkl', 'guest', (err) => {
    if (err) debugACL(err);
  });
}
