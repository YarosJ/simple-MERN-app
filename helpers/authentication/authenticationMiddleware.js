import abilities from "./abilities";

function checkAdminInRequest(req) {
    console.log(req.session.passport);
    if (req.isAuthenticated()) {
        return req.session.passport.user.rights;
    } else {
        return 'all';
    }
}

export default function authenticationMiddleware() {
    return function (req, res, next) {

        if (abilities(checkAdminInRequest(req), req.method, req.originalUrl)) {
            console.log(res.statusCode);
            console.log("---------Allow-----------------");
            next();
        } else {
            console.log("---------Not allow-----------------");
            console.log(res.statusCode);
            if (!res.statusCode) res.sendStatus(403);
        }

    }
}
