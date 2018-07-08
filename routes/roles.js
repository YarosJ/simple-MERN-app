import express from 'express';
import RolesController from '../controllers/rolesController';
import authenticationMiddleware from '../helpers/authentication/AuthenticationMiddleware';

/**
 * Roles route
 * @param acl (Access control list for authentication middleware)
 * @returns {Router|router|*}
 * @private
 */

const _router = (acl) => {
  const router = express.Router();
  const roles = new RolesController(acl);

  /**
   * @api {get} /roles
   * Return all roles
   * @apiName GetAll
   * @apiGroup Roles
   * @apiVersion 1.0.0
   * @apiPermission depends on the permissions settings in the admin.
   *
   * @apiSuccess {Array} Roles List of all roles.
   * @apiSuccessExample SuccessResponse:
   *     HTTP/1.1 200 OK
   *     [
   *       {
   *          "key": "guest"
   *       },
   *       {
   *          "key": "superAdmin"
   *       },
   *       {
   *          "key": "user"
   *       },
   *       {
   *          "key": "admin"
   *       }
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

  router.get('/', authenticationMiddleware(acl), (req, res) => roles.getRoles(req, res));

  /**
   * @api {get} /roles/:role/permissions
   * Return permissions of role
   * @apiName GetRolePermissions
   * @apiGroup Roles
   * @apiVersion 1.0.0
   * @apiPermission depends on the permissions settings in the admin.
   *
   * @apiSuccess {Array} Permissions Role list of Permissions.
   * @apiSuccessExample SuccessResponse:
   *     HTTP/1.1 200 OK
   *    {
   *      "/roles/": [
   *          "GET"
   *      ],
   *      "/users/": [
   *          "GET"
   *      ],
   *      "test": [
   *          "POST",
   *          "DELETE"
   *      ],
   *      "/testimonials/": [
   *          "GET"
   *      ],
   *      "/": [
   *          "GET"
   *      ]
   *    }
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

  router.get('/:role/permissions', authenticationMiddleware(acl), (req, res) => roles.getRolePermissions(req, res));

  /**
   * @api {post} /role
   * Add resource and permission from request to role
   * @apiName Create
   * @apiGroup Roles
   * @apiVersion 1.0.0
   *
   * @apiParamExample {String} Request-Example:
   *     {
   *      "role": "guest",
   *      "resource": "testResource",
   *      "permission": ["POST","DELETE"]
   *     }
   *
   * @apiSuccess {String} User New user.
   * @apiSuccessExample SuccessResponse:
   *     HTTP/1.1 200 OK
   *     {
   *       "role": "guest",
   *       "resource": "testResource",
   *       "permission": [
   *           "POST",
   *           "DELETE"
   *       ]
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

  router.post('/', authenticationMiddleware(acl), (req, res) => roles.addAllow(req, res));

  /**
   * @api {delete} /roles/:role/resources/:resource/permissions/:permission
   * Delete permission from role resource
   * @apiName Delete
   * @apiGroup Roles
   * @apiVersion 1.0.0
   * @apiPermission depends on the permissions settings in the admin.
   *
   * @apiParam {String} role role.
   * @apiParam {String} resource resource.
   * @apiParam {String} permission permission.
   *
   * @apiSuccess {String} SuccessResponse Success message.
   * @apiSuccessExample SuccessResponse:
   *     HTTP/1.1 200 OK
   *     {
   *      "message": "Success"
   *     }
   *
   * @apiError NotFound role resource or permission in params doesn't exist.
   * @apiErrorExample NotFound:
   *     HTTP/1.1 404 Not Found
   *     {
   *      "message": "Not found"
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

  router.delete('/:role/resources/:resource/permissions/:permission', authenticationMiddleware(acl), (req, res) => roles.deleteAllow(req, res));

  return router;
};

export default _router;
