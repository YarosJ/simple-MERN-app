import express from 'express';
// import RolesController from '../controllers/rolesController';
// import authenticationMiddleware from '../helpers/authentication/AuthenticationMiddleware';

const router = express.Router();
// const roles = new RolesController(acl);


// Redirect the user to the OAuth 2.0 provider for authentication.  When
// complete, the provider will redirect the user back to the application at
//     /auth/provider/callback
router.get('/auth/provider', passport.authenticate('provider'));

// The OAuth 2.0 provider has redirected the user back to the application.
// Finish the authentication process by attempting to obtain an access
// token.  If authorization was granted, the user will be logged in.
// Otherwise, authentication has failed.
router.get('/auth/provider/callback',
    passport.authenticate('provider', { successRedirect: '/',
      failureRedirect: '/login' }));


// router.get('/', authenticationMiddleware(acl), (req, res) => roles.GetRoles(req, res));
//
// router.get('/:role/rolePermissions', authenticationMiddleware(acl), (req, res) => roles.GetRolePermissions(req, res));
//
// router.post('/', authenticationMiddleware(acl), (req, res) => roles.AddAllow(req, res));
//
// router.delete('/:role/resources/:resource/permissions/:permission', authenticationMiddleware(acl), (req, res) => roles.DeleteAllow(req, res));
//
// router.delete('/:role/resources/:resource', authenticationMiddleware(acl), (req, res) => roles.DeleteAllow(req, res));

export default router;