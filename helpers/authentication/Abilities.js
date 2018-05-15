import {abilities} from './AbilitiesWhiteList';

export default function (role, method, url) {

    let patches = abilities[role][method];

    if (patches) {
        if (method === 'PUT' || method === 'DELETE') {
            return !!patches.filter(path => !!url.match(new RegExp('\\/' + path + '\\/.*', 'gi')));
        } else return (patches.indexOf(url) >= 0);
    } else return false;
}