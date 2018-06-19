export default function authenticationMiddleware(myAcl) {

    return function (req, res, next) {
        // if (req.isAuthenticated()) {
        //     myAcl.userRoles(req.session.passport.user._id, function (err, roles) {
        //         console.log(roles);
        //         console.log(req.isAuthenticated());
        //         console.log(req.originalUrl);
        //     });
        // }

        myAcl.isAllowed(req.session.passport.user._id, req.originalUrl, req.method, (err, permissions) => {
            console.log(permissions);
            if (permissions) {
                console.log(permissions);
                next();
            } else if (!res.statusCode) res.sendStatus(403);
        });
    }
}
