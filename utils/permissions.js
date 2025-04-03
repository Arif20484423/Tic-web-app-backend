import roles from "../config/roles.json"
import {getRole } from "./role.js"



export function getPermissions(role) {
  var role_permissions = getRole(role);
  return role_permissions ? role_permissions.permissions : [];
}


