// ------------------------------------------------------------------------------------------
// General apiDoc documentation blocks and old history blocks.
// ------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------
// Current Success.
// ------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------
// Current Errors.
// ------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------
// Current Permissions.
// ------------------------------------------------------------------------------------------

/**
 * @apiDefine UnauthorizedError
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} Authorization Access JSON web token.
 *
 * @apiError TokenExpiredError JSON web token expired
 * @apiErrorExample TokenExpiredError:
 *     HTTP/1.1 400 Bad Request
 *     {
 *      "name": "TokenExpiredError",
 *      "message": "jwt expired",
 *      "expiredAt": "2018-07-03T17:39:59.000Z"
 *     }
 *
 * @apiError JsonWebTokenError Invalid JSON web token
 * @apiErrorExample JsonWebTokenError:
 *      HTTP/1.1 400 Bad Request
 *     {
 *      "name": "JsonWebTokenError",
 *      "message": "invalid signature"
 *     }
 */

// ------------------------------------------------------------------------------------------
// History.
// ------------------------------------------------------------------------------------------