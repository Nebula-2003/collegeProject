const User = require("../services/users/users.model");

exports.guard = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            const token = req.cookies.jwt;
            if (!token) {
                return res.redirect("/users/login?message=Session expired");
            }
            const user = await User.verifyToken(token);
            if (!user) {
                return res.redirect("/users/login?message=Access denied");
            }
            if (!allowedRoles.includes(user.role)) {
                return res.redirect("/users/login?message=Access denied");
            }
            req.user = user;
            next();
        } catch (error) {
            return res.redirect("/users/login?message=Access denied");
        }
    };
};
