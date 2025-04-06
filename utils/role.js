
import roles from  "../config/roles.json" assert { type: "json" }

export function getRole(role) {
  return roles.roles.find((r) => r.name === role);
}



