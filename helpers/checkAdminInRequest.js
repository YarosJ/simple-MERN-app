export default function (req) {
    if (req.isAuthenticated()) {
        return !!req.session.passport.user.rights.match(/admin/gi);
    } else {
        return false;
    }
}