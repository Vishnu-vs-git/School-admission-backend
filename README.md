# Edustart Portal - Backend Service

This is the backend microservice for the Edustart School Admission Portal, built using **NestJS** and **MongoDB** using strict **Clean Architecture** patterns.

---

## 📂 Codebase Directory Structure

```
backend/src/
├── domain/                    # Core business rules & entities (Independent of frameworks)
│   ├── entities/              # Business entities (User, Student, ExamSlot)
│   ├── enums/                 # Domain enumerations (Role, Grade, ApplicationStatus)
│   └── repositories/          # Abstract database gateway interfaces
├── application/               # Business application use cases
│   ├── dto/                   # Data Transfer Objects for validation schemas
│   ├── interfaces/            # Dependency injection contracts & use case signatures
│   ├── types/                 # Application-specific payload types
│   └── use-cases/             # Concrete implementation of business routines
├── infrastructure/            # Framework implementations & external database systems
│   ├── persistence/           # Database adapter repositories, Mongoose schemas and models
│   └── services/              # Password hashing & external utility integrations
├── presentation/              # Web Controller layer (HTTP handlers)
│   ├── auth/                  # Register, Login, Logout controller and passport strategy
│   ├── admission/             # Staff admission management controller
│   └── slot/                  # Exam Slot controller
└── common/                    # Constants, pipes, decorators, and middleware utilities
```

---

## 🛠️ Configuration & Installation

1. **Install Packages**:
   ```bash
   npm install
   ```
2. **Environment Variables (`.env`)**:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/school-admission
   JWT_ACCESS_SECRET=your_super_secret_access_token_key_here
   JWT_REFRESH_SECRET=your_super_secret_refresh_token_key_here
   FRONTEND_URL=http://localhost:3002
   ```

---

## ⚙️ Available Scripts

### Database Seeding
Create the default `admission@test.com` admin user in MongoDB:
```bash
npm run seed:admin
```

### Running Server
```bash
# Development mode
npm run start:dev

# Production build compilation
npm run build

# Start production server
npm run start:prod
```

### Testing
```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e
```

---

## 🔌 API Endpoints Summary

### Authentication (`/api/auth`)
* `POST /auth/register`: Parent registration (secured to force role `parent`).
* `POST /auth/login`: Authenticates credentials and sets HTTP-only cookies.
* `POST /auth/logout`: Clears authentication cookies.

### Students (`/api/students`)
* `POST /students`: Creates a new child admission application (Parent only).
* `PUT /students/:id`: Updates student details before payment (Parent only).
* `GET /students/:id`: Gets student application details.
* `GET /students?page=1&limit=5`: Gets paginated student applications list for the logged-in parent.
* `POST /students/:id/pay`: Complete registration fee payment (status transition).

### Admission Staff (`/api/admission`)
* `GET /admission/students?page=1&limit=5`: Lists all student applications in the system (Staff only).
* `PATCH /admission/students/:id/score`: Submits entrance exam scores (Staff only).
* `PATCH /admission/students/:id/course`: Assigns a course level and finalizes admission (Staff only).

### Exam Slots (`/api/exam-slots`)
* `POST /exam-slots`: Creates new exam dates with limit capacity (Staff only).
* `GET /exam-slots`: Lists available slots for parents, and all scheduled slots for staff.
* `GET /exam-slots/:id`: Looks up specific slot details.
