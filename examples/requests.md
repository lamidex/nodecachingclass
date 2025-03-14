API Request Examples
Create User (POST /users)
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
Update User (PUT /users/:id)
{
  "name": "John Smith",
  "email": "john.smith@example.com",
  "age": 31
}
Example cURL commands
Create User
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "age": 30}'
Get All Users
curl http://localhost:3000/users
Get Single User
curl http://localhost:3000/users/USER_ID
Update User
curl -X PUT http://localhost:3000/users/USER_ID \
  -H "Content-Type: application/json" \
  -d '{"name": "John Smith", "email": "john.smith@example.com", "age": 31}'
Delete User
curl -X DELETE http://localhost:3000/users/USER_ID
Note: Replace USER_ID with the actual MongoDB ObjectId of the user you want to interact with.