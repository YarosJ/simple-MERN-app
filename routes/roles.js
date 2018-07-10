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
   * Get all roles
   * @apiName List
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
   * @apiUse UnauthorizedError
   * @apiUse ServerError
   */

  router.get('/', authenticationMiddleware(acl), (req, res) => roles.getRoles(req, res));

  /**
   * @api {get} /roles/:role/permissions
   * Get permissions of role
   * @apiName Get
   * @apiGroup Roles
   * @apiVersion 1.0.0
   * @apiPermission depends on the permissions settings in the admin.
   *
   * @apiSuccess {Array} Permissions Permissions list of Role.
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
   * @apiUse UnauthorizedError
   * @apiUse ServerError
   */

  router.get('/:role/permissions', authenticationMiddleware(acl), (req, res) => roles.getRolePermissions(req, res));

  /**
   * @api {post} /role
   * Add resource and permissions to role
   * @apiName Create
   * @apiGroup Roles
   * @apiVersion 1.0.0
   * @apiPermission depends on the permissions settings in the admin.
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
   * @apiError ValidationError Invalid data.
   * @apiErrorExample ValidationError:
   *     HTTP/1.1 400 Bad Request
   *     {
   *      "message": "Empty field is not allowed"
   *     }
   *
   * @apiUse UnauthorizedError
   * @apiUse ServerError
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
   *      "message": "Resource not found"
   *     }
   *
   * @apiUse UnauthorizedError
   * @apiUse ServerError
   */

  router.delete('/:role/resources/:resource/permissions/:permission', authenticationMiddleware(acl), (req, res) => roles.deleteAllow(req, res));

  return router;
};

export default _router;
