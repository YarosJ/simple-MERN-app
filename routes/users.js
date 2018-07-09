import express from 'express';
import UsersController from '../controllers/usersController';
import authenticationMiddleware from '../helpers/authentication/AuthenticationMiddleware';

/**
 * Users route
 * @param acl (Access control list for authentication middleware)
 * @returns {Router|router|*}
 * @private
 */

const _router = (acl) => {
  const router = express.Router();
  const controller = new UsersController();

  /**
  * @api {get} /users
  * Get all users
  * @apiName GetAll
  * @apiGroup Users
  * @apiVersion 1.0.0
  * @apiPermission depends on the permissions settings in the admin.
  *
  * @apiSuccess {Array} Users List of all users.
  * @apiSuccessExample SuccessResponse:
  *     HTTP/1.1 201 OK
  *     [
  *       {
  *         "role": "superAdmin",
  *         "createdAt": "2018-06-26T17:04:23.331Z",
  *         "email": "admin@ex.com",
  *         "_id": "5b3272178d585a42b2618b11"
  *       },
  *       {
  *         "role": "superAdmin",
  *         "createdAt": "2018-06-26T17:04:44.592Z",
  *         "email": "user@ex.com",
  *         "_id": "5b32722c8d585a42b2618b12"
  *       },
  *       {
  *         "role": "admin",
  *         "createdAt": "2018-07-01T13:38:12.085Z",
  *         "email": "example@ex.com",
  *         "_id": "5b38d9448deddc50abcc965f"
  *       },
  *     ]
  *
  * @apiError ServerError Server error.
  * @apiErrorExample ServerError:
  *     HTTP/1.1 500 Internal Server Error
  *     {
  *      "message": "<Error>"
  *     }
  *
  * @apiUse UnauthorizedError
  *
  */

  router.get('/', authenticationMiddleware(acl), (req, res) => controller.getUsers(req, res, acl));

  /**
   * @api {post} /users
   * Create new user
   * @apiName Create
   * @apiGroup Users
   * @apiVersion 1.0.0
   *
   * @apiParamExample {String} Request-Example:
   *     {
   *      "email": "example@ex.com",
   *      "password": "1111111"
   *     }
   *
   * @apiSuccess {String} User New user.
   * @apiSuccessExample SuccessResponse:
   *     HTTP/1.1 201 OK
   *     {
   *      "email": "example@ex.com",
   *      "role": "user"
   *     }
   *
   * @apiError ConflictEmail Already exist.
   * @apiErrorExample ConflictEmail:
   *     HTTP/1.1 409 Conflict
   *     {
   *      "message": "This user is already exist"
   *     }
   *
   * @apiError ValidationError Invalid data.
   * @apiErrorExample ValidationError:
   *     HTTP/1.1 400 Bad Request--------------------------------------------------------------------------500??regexp
   *     {
   *      "message": "User validation failed: email: Path `email` is required."
   *     }
   *
   * @apiError ServerError Server error.
   * @apiErrorExample ServerError:
   *     HTTP/1.1 500 Internal Server Error
   *     {
   *      "message": "<Error>"
   *     }
   *
   */

  router.post('/', (req, res) => controller.createUser(req, res, acl));

  /**
   * @api {put} /users/:id
   * Update user by id
   * @apiName Update
   * @apiGroup Users
   * @apiVersion 1.0.0
   * @apiPermission depends on the permissions settings in the admin.
   *
   * @apiParam {String} id id of user.
   *
   * @apiParamExample {String} Request-Example:
   *     {
   *      "email": "example@ex.com",
   *      "role": "user"
   *     }
   *
   * @apiSuccess {String} User Updated user.
   * @apiSuccessExample SuccessResponse:
   *     HTTP/1.1 200 OK
   *     {
   *      "_id": "5b41de3a2623e02a4d3f4334"
   *      "email": "example@ex.com",
   *      "role": "user"
   *      "createdAt": "2018-07-08T09:49:46.359Z"
   *     }
   *
   * @apiError NotFound User by this id doesn't exist.
   * @apiErrorExample NotFound:
   *     HTTP/1.1 404 Not Found
   *     {
   *      "message": "This user is not found"
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
   *
   */

  router.put('/:id', authenticationMiddleware(acl), (req, res) => controller.updateUser(req, res, acl));

  /**
   * @api {delete} /users/:id
   * Delete user by id
   * @apiName Delete
   * @apiGroup Users
   * @apiVersion 1.0.0
   * @apiPermission depends on the permissions settings in the admin.
   *
   * @apiParam {String} id id of user.
   *
   * @apiSuccess {String} SuccessResponse Success message.
   * @apiSuccessExample SuccessResponse:
   *     HTTP/1.1 200 OK
   *     {
   *      "message": "Success"
   *     }
   *
   * @apiError NotFound User by this id is not found.
   * @apiErrorExample NotFound:
   *     HTTP/1.1 404 Not Found
   *     {
   *      "message": "This user is not found"
   *     }
   *
   * @apiError Forbidden Not allowed delete SuperAdmin.
   * @apiErrorExample Forbidden:
   *     HTTP/1.1 403 Forbidden
   *     {
   *      "message": "SuperAdmin can't be deleted"
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
   *
   */

  router.delete('/:id', authenticationMiddleware(acl), (req, res) => controller.deleteUser(req, res, acl));

  return router;
};

export default _router;
