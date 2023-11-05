const User = require("../services/users/users.model");

exports.guard = async (allowedRoles) => {
    return async (req, res, next) => {
        try {
            const token = req.cookies.jwt;
            if (!token) {
                res.render("login?message=Session expired");
            }
            const user = await User.verifyToken(token);
            if (!user) {
                res.render("login?message=Access denied");
            }
            if (!allowedRoles.includes(user.role)) {
                res.render("login?message=Access denied");
            }
            req.user = user;
            next();
        } catch (error) {
            res.render("login?message=Access denied");
        }
    };
};
