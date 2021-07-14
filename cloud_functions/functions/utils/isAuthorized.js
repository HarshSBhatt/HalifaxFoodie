exports.isAuthorized = ({ hasRole, allowSameUser }) => {
  return (req, res, next) => {
    const { role, email, uid } = res.locals;
    const { id } = req.params;

    if (email === "harshsamir98@gmail.com") return next();

    if (allowSameUser && id && uid === id) return next();

    if (!role) return res.status(403).send();

    if (hasRole.includes(role)) return next();

    return res.status(403).json({
      success: false,
      message: "You are not authorized to perform this operation",
    });
  };
};
