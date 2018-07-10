import jwt from 'jsonwebtoken';

const guestId = 'guest123456789abcdefghkl';

/**
 * Authorization by session or JWT, depending of the header "Authorization"
 * @param myAcl
 * @returns {Function}
 */

export default function authenticationMiddleware(myAcl) {
  return (req, res, next) => {
    let userId;
    const token = req.get('Authorization');
    if (req.isAuthenticated()) {
      userId = req.session.passport.user._id;
    } else if (token) {
      try {
        userId = jwt.verify(token, 'secret')._id;
      } catch (err) {
        userId = guestId;
        if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
          res.status(400).json(err);
        } else {
          res.status(500).json(err);
        }
        return;
      }
    } else {
      userId = guestId;
    }

    myAcl.isAllowed(userId, req.baseUrl + req.route.path, req.method, (err, permissions) => {
      if (permissions) {
        next();
      } else res.status(401).json({ message: 'Unauthorized'});
    });
  };
}
