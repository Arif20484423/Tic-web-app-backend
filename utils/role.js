import roles from  "../config/roles.json"

export function getRole(role) {
  return roles.roles.find((r) => r.name === role);
}


