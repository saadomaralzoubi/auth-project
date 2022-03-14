"use strict";
function acl(action) {
  return (req, res, next) => {
    try {
      if (req.User.actions.includes(action)) {
        next();
      } else {
        next("UNAUTHORIZED");
      }
    } catch (error) {
      next("error");
    }
  };
}
module.exports = acl;
