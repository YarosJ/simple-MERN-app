import express from 'express';
import AuthenticationController from '../controllers/authenticationController';

/**
 * authentication route
 * @param acl (Access control list for login action)
 * @returns {Router|router|*}
 * @private
 */

const _router = (acl) => {
  const router = express.Router();
  const controller = new AuthenticationController();

  /**
   * @api {post} /login
   * Log in user (return access and refresh JWT)
   * @apiName Login
   * @apiGroup Authentication
   * @apiVersion 1.0.0
   *
   * @apiHeader {String} Authorization Can be anything but not empty.
   *
   * @apiParamExample {json} Request-Example:
   *     {
   *      "email": "example@ex.com",
   *      "password": "1111111"
   *     }
   *
   * @apiSuccess {String} acessToken Should be stored, for example, in local storage.
   * @apiSuccess {String} refereshToken Should use to access resources.
   * @apiSuccessExample SuccessResponse:
   *     HTTP/1.1 200 OK
   *     {
   *       "acessToken": "<JWT>",
   *       "refreshToken": "<JWT>"
   *     }
   *
   * @apiError IncorrectEmail Incorrect email.
   * @apiErrorExample IncorrectEmail:
   *     HTTP/1.1 400 Bad Request
   *     {
   *      "message": "Incorrect email."
   *     }
   *
   * @apiError IncorrectPassword Incorrect password.
   * @apiErrorExample IncorrectPassword:
   *     HTTP/1.1 400 Bad Request
   *     {
   *      "message": "Incorrect password."
   *     }
   *
   * @apiError ServerError Server error.
   * @apiErrorExample ServerError:
   *     HTTP/1.1 500 Internal Server Error
   *     {
   *      "message": "<Error>"
   *     }
   */

  router.post('/login', (req, res, next) => controller.logIn(req, res, next, acl));

  /**
   * @api {post} /refresh
   * Refresh access token (by refresh token)
   * @apiName Refresh
   * @apiGroup Authentication
   * @apiVersion 1.0.0
   *
   * @apiHeader {String} Authorization Refresh token.
   *
   * @apiSuccess {String} accessToken New access token.
   * @apiSuccessExample SuccessResponse:
   *     HTTP/1.1 200 OK
   *     {
   *       "accessToken": "<JWT>"
   *     }
   *
   * @apiError ServerError Server error.
   * @apiErrorExample ServerError:
   *     HTTP/1.1 500 Internal Server Error
   *     {
   *      "message": "<Error>"
   *     }
   *
   * @apiUse UnauthorizedError
   */

  router.post('/refresh', (req, res) => controller.refresh(req, res));

  router.get('/logout', (req, res) => controller.logOut(req, res));

  return router;
};

export default _router;
