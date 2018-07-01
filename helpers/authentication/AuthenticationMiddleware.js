import jwt from 'jwt-simple';

export default function authenticationMiddleware(myAcl) {
  return (req, res, next) => {
    let userId;
    const token = req.get('Authorization') || req.query.token;
    if (req.isAuthenticated()) {
      userId = req.session.passport.user._id;
    } else if (token) {
      userId = jwt.decode(token, 'secret')._id;
    } else {
      userId = 'guest123456789abcdefghkl';
    }

    myAcl.isAllowed(userId, req.baseUrl + req.route.path, req.method, (err, permissions) => {
      if (permissions) {
        next();
      } else if (!res.statusCode) res.sendStatus(403);
    });
  };
}
