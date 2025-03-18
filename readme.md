# Test Admin Api

Implements a CRUD service for a user database.

| Method    | Url | Description |
| -------- | ------- | --- |
| PUT  | `/create-profile`   | Creates a new user profile |
| GET    | `/get-profile/:id`    | Gets the requested user profile via its ID |
| PUT | `/update-profile/:id`  | Updates the given user profile via its ID. Add update information to the body. |
| DELETE    | `/delete-profile/:id`  | Deletes the given user profile |

## Security

If there is a valid certificate key in `/certs/server.key` and a valid certificate in `/certs/server.crt`, the app will run with HTTPS.