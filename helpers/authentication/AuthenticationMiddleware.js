import abilities from "./Abilities";

function checkAdminInRequest(req) {
    if (req.isAuthenticated()) {
        return req.session.passport.user.rights;
    } else {
        return 'all';
    }
}

export default function authenticationMiddleware() {
    return function (req, res, next) {
        if (abilities(checkAdminInRequest(req), req.method, req.originalUrl)) {
            next();
        } else {
            if (!res.statusCode) res.sendStatus(403);
        }
    }
}
