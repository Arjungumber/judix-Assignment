# Assignment

# Employee/Task Tracker System

A full-stack **MERN** web application that allows admins to manage tasks and employees efficiently. Employees can view their assigned tasks,can see and update their profile, while admins have full control over all tasks with CRUD operations, filtering, sorting, and searching capabilities.

---

## Features

### Authentication & Authorization:
- User registration and login using JWT authentication
- Role-based access control (admin, user)
- Protected routes using middleware
- Secure password hashing with bcrypt

### Admin:
- Create, Read, Update, and Delete (CRUD) tasks.
- View tasks assigned to all employees.
- Search tasks by task name or employee name.
- Sort tasks based on different criteria.
- Filter tasks by status (Completed, Pending, Ongoing).

### Employee/User:
- View only their assigned tasks.
- View and update their profile.

---

## Tech Stack

- **Frontend:** React, Axios, Tailwind CSS, React Toastify
- **Backend:** Node.js, Express.js, Mongoose, dotenv, bcrypt, JWT 
- **Database:** MongoDB
- **Other:** NPM for package management

---

# Task API Documentation
## Base URL
http://localhost:5000

## Authentication
All endpoints require a JWT token in the headers:
`Authorization: Bearer <token>`

# Task API Endpoints

### 1. Get All Tasks
**Endpoint:** `GET /api/tasks`  

**Description:**  
- Admin users can see all tasks.  
- Non-admin users only see tasks they created. 

**Query Parameters (optional):**  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `status`  | string | Filter tasks by status (`Pending`, `In Progress`, `Completed`). |
| `sort`    | string | Sort tasks. Currently only supports `dueDate`. |
| `search`  | string | Search by task title or `assignedTo` (case-insensitive). |

**Request Example:**
```bash
GET /tasks?status=Pending&sort=dueDate&search=John
```

**Response Example:**
```json
[
  {
    "_id": "650c3f2a9f1e4d0012345678",
    "title": "Complete Report",
    "assignedTo": "John Doe",
    "status": "Pending",
    "dueDate": "2025-10-20T00:00:00Z",
    "createdBy": {
      "_id": "650c3f2a9f1e4d0098765432",
      "name": "Alice",
      "email": "alice@example.com"
    }
  }
]
```

### 2. Create a task
**Endpoint:** `POST /api/tasks` 
**Description:**  
- Creates a new task.

**Request Body:**
```json
{
  "title": "Task 1",
  "assignedTo": "User1",
  "status": "Pending",
  "dueDate": "2025-10-20",
  "createdBy": "<userId>"
}
```
**Response Example:**
```json
{
  "_id": "...",
  "title": "Task 1",
  "assignedTo": "User1",
  "status": "Pending",
  "dueDate": "2025-10-20T00:00:00Z",
  "createdBy": "..."
}
```

### 3. Update a task
**Endpoint:** `PUT /api/tasks/:id` 
**Description:**  
- Updates task.
- Only admin can update a task

**Request Body:**
```json
{
  "title": "Updated Task",
  "assignedTo": "User2",
  "status": "In Progress",
  "dueDate": "2025-10-25"
}

```
**Response Example:**
```json
{
  "_id": "...",
  "title": "Updated Task",
  "assignedTo": "User2",
  "status": "In Progress",
  "dueDate": "2025-10-25T00:00:00Z",
  "createdBy": "..."
}

```

### 4. Delete a task
**Endpoint:** `delete /api/tasks/:id` 
**Description:**  
- Deletes task.
- Only admin can delete a task


**Request Example**
```bash
delete api/tasks/650c3f2a9f1e4d0012345678
```

**Response Example:**
```json

  {
  "message": "Task deleted successfully"
  }

```

# Auth & User API Endpoints


### 1. Signup
POST /api/auth/signup

### 2. Login
POST /api/auth/login

### 3. Get Profile
**Endpoint:** `GET /api/auth/me`  

**Description:**  
- Fethces the user detail from the database.
- Returns the currently logged-in user's profile
- User is identified via JWT token (_id from MongoDB)

**Authorization:**
- Requires valid JWT token

**Response Example:**
```json
{
  "_id": "650c3f2a9f1e4d0012345678",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user"
}

```

# Admin API Endpoints

### 1. Get all Users
**Endpoint:** `GET /api/admin/users`
**Description:**  
- Gets all the users from db.
- Only admin can access.

**Query Parameters (optional):**  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `page`    | number | current page to show|
| `limit`  | number | sets the limit for fetched users. |

**Request Example**
```bash
GET api/admin/users?page=1&&limit=10
```

**Response Example**
```json
0 : {_id: '69549cae3a642a8e49e572a8', fullName: 'max holden', email: 'max1@gmail.com', role: 'user', status: 'active', …}
1 : {_id: '6953c54013f49efb9b2cca23', fullName: 'Arjun', email: 'arjun@gmail.com', role: 'admin', status: 'active', …}
2: {_id: '69537ac7fd17f0f652f6b9c8', fullName: 'john smit', email: 'john@gmail.com', role: 'user', status: 'active', …}
```

### 2. update user status
**Endpoint:** `Put /api/admin/user/:id/:action`
**Description:**  
- Update the user status.
- Only admin can update.

**Request Example**
```bash
PUT api/admin/user/69549cae3a642a8e49e572a8/active
```
**Response Example**
```json
 {_id: '69549cae3a642a8e49e572a8', fullName: 'max holden', email: 'max1@gmail.com', role: 'user', status: 'active', message:'user has been activated' }
```

# User Endpoints

### 1. Get Me
**Endpoint:** `GET /api/users/me`  

**Description:**  
- helps get the loggedIn user profile.  
 
**Request Example:**
```bash
GET /api/users/me
```

**Response Example:**
```json
[
  {
    "_id": "650c3f2a9f1e4d0012345678",
    "email" : "john@email.com",
    "fullName" :"John Smit",
    "status": "active",
    "createdBy": {
    }
  }
]
```

### 2. Update profile
**Endpoint:** `PUT /api/users/me` 
**Description:**  
- Updates user email, fullName

**Response Example:**
```json
{
  "_id": "...",
  "fullName": "John Smith",
  "email": "john@email.com",
  "status": "active",
  "createdBy": "..."
}
```

### 3. change password
**Endpoint:** `PUT /api/users/password` 
**Description:**  
- Updates password of a user.
- requires the current password

**Response Example:**
```json
{
  "_id": "...",
  "fullName": "John Smith",
  "email": "john@email.com",
  "status": "active",
  "createdBy": "...",
  "message" : "password updated successfully"
}

```


# Installation
1. **Clone the repository:**
   ```bash
   git clone (https://github.com/Arjungumber/judix-Assignment.git)
   cd assignment


2.  **Install Dependencies**
    ```bash
    npm install


 3. **Setup Environment variables** 
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret 
    PORT=5000


4. **Run the backend Server**
   ```bash
   npm run dev


5. **Run the frontend**
   ```bash
   npm run start

6. **Open the app**
   Visit http://localhost:3000 in your browser.
