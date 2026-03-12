# TeamTrack

**TeamTrack** is a collaborative workflow and task management system designed to simulate how real-world engineering teams organize and track work.

It implements a **hierarchical project structure (Team → Project → Sprint → Task)** similar to tools like Jira, enabling teams to plan work, manage tasks, and coordinate across multiple members with role-based permissions.

The system focuses on **backend architecture, data modeling, and access control**, demonstrating how scalable workflow systems can be built.

---

## Features

### Hierarchical Workflow Engine
Structured hierarchy for organizing work:

Team → Project → Sprint → Task

This enables structured planning and execution across multiple teams.

### Task Lifecycle Management
- Create tasks
- Assign tasks
- Update task status
- Track progress across sprints

### Role-Based Access Control (RBAC)
- Permission-based actions for team members
- Role management within teams
- Controlled access to projects and tasks

### Team Collaboration
- Team creation
- Role-based permissions for actions

### Secure Authentication
- JWT-based authentication
- Protected API routes
- Secure access to team resources

### Concurrent Multi-User Support
MongoDB schemas are structured to maintain consistency across nested entities and support concurrent multi-user updates.

---

## Tech Stack

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose

**Authentication**
- JWT (JSON Web Tokens)

**Architecture**
- REST APIs
- Modular backend structure

---

## System Architecture

The application models real-world project management workflows using hierarchical relationships.

```
Team
├── Project
│ ├── Sprint
│ │ ├── Task
│ │ ├── Task
│ │ └── Task
│ └── Sprint
└── Members (RBAC)
```

Each level in the hierarchy controls access and context for the level below it.

- **Teams** manage members and permissions  
- **Projects** group related work  
- **Sprints** organize time-boxed work cycles  
- **Tasks** represent actionable items

---

## API Capabilities

The backend exposes REST APIs for:

- User authentication
- Team creation and invitations
- Project management
- Sprint management
- Task creation and updates
- Permission-based actions

All sensitive endpoints are protected using **JWT authentication middleware**.

---

---

## Getting Started

### Clone the repository
```
git clone https://github.com/mayhemking007/TeamTrack.git

cd TeamTrack
```

### Configure environment variables

Create a `.env` file in the backend/ directory:
```
DB_URL=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

## Running the Application

The project has **separate frontend and backend services**, so both need to be started.

### 1. Open two terminals

### 2. Start the backend server

```bash
cd backend
npm install
npm run dev
```
### 3. Start the frontend server

```bash
cd frontend
npm install
npm run dev
```
After starting both services, the application should be available in your browser at:

http://localhost:5173

## Example Workflow

1. A user signs up and creates a **team**.
2. A **project** is created within the team.
3. Work is organized into **sprints**.
4. **Tasks** are created, assigned, and tracked by team members.

---

## Author

**Sarthak Chaturvedi**