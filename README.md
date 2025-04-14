
# Important backend note

# Role Based Access Control (RBAC) (For developers)
``` bash
- used roles and permission json file you can view in utils
- and middlewares are used to check roles and permission to continue to route
```

# Login flow
``` bash
- once user login token(name, role, etc) and refresh token(student id)  are set and passed as response
- when user access something now req passes through auth.middleware
```
