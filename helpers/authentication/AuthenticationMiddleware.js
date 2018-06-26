export default function authenticationMiddleware(myAcl) {

    return function (req, res, next) {
        let userId;
        if (req.isAuthenticated()) {
            userId = req.session.passport.user._id;
        } else {
            userId = 'guest123456789abcdefghkl';
        }

        myAcl.isAllowed(userId, req.baseUrl + req.route.path, req.method, (err, permissions) => {
            if (permissions) {
                next();
            } else if (!res.statusCode) res.sendStatus(403);
        });
    }
}
