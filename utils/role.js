
import {roles} from "../config/roles.js"

export function getRole(role) {
  return roles.find((r) => r.name === role);
}



