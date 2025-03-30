const roles = require("../config/roles.json");
const { getRole } = require("./role");

function getPermissions(role) {
  var role_permissions = getRole(role);
  return role_permissions ? role_permissions.permissions : [];
}

module.exports = { getPermissions };
