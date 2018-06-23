import deasyncPromise from 'deasync-promise';

export default function (myAcl) {

    const allows = [
        {
            roles: ['guest'],
            allows: [
                {resources: ['/', '/testimonials/'], permissions: 'GET'}
            ]
        },
        {
            roles: ['user'],
            allows: [
                {resources: ['/roles/', '/users/'], permissions: ['GET']}
            ]
        },
        {
            roles: ['admin'],
            allows: [
                {
                    resources: ['/roles/:role/rolePermissions'], permissions: ['GET']
                },
                {
                    resources: ['/users/:id', '/testimonials/', '/testimonials/:id'],
                    permissions: ['PUT', 'DELETE', 'POST']
                }
            ]
        },
        {
            roles: ['superAdmin'],
            allows: [
                {resources: '/users/:id', permissions: ['*']}
            ]
        }
    ];

    myAcl.allow(allows, (err) => {

            console.log('    Structure of ACL:    ');

            console.log(allows);

            console.log('    Inheritance:    ');

            if (!err) allows.reduce((accumulator, currentValue) => {
                deasyncPromise(myAcl.addRoleParents(currentValue.roles[0], accumulator.roles[0]));
                console.log('Role:', currentValue.roles[0], 'inherited from:', accumulator.roles[0]);
                return currentValue;
            });

            console.log('*** ACL successfully configured ***');

        }
    );

    myAcl.addUserRoles('guest123456789abcdefghkl', 'guest', (err) => {
        if (err) console.log(err);
    });

}
