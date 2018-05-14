export default function (role, method, url) {

    const allow = {
        'all': {
            'GET': [
                '/', '/users', '/logout',
                '/testimonials'
            ],
            'POST': [
                '/users/login', '/users/register'
            ]
        },
        'user': {},
        'admin': {
            'GET': [
                '/', '/users', '/logout',
                '/testimonials'
            ],
            'PUT': [
                '/', '/users/',
                '/testimonials/'
            ],
            'POST': [
                '/users/login', '/users/register',
                '/testimonials/'
            ],
            'DELETE': [
                '/users/',
                '/testimonials/'
            ]
        },
        'superAdmin': {}
    }

    let patches = allow[role][method];

    if (patches) {
        if (method === 'PUT' || method === 'DELETE') {
            return !!patches.filter(path => !!path.match(/\/users\/.*/gi));
        } else return (patches.indexOf(url) >= 0);
    } else return false;
}