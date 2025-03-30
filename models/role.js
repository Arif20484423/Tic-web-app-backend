const roles = require("../config/roles.json");

function getRole(role) {
  return roles.roles.find((r) => r.name === role);
}

module.exports = { getRole };
