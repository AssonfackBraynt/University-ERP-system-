# ERP System Backend

This project is a backend implementation of an ERP system using Node.js, Express.js, MySQL with Sequelize ORM, and JWT for authentication. It provides a modular structure for managing various aspects of an educational institution, including academic, financial, and HR operations.

## Features

- **User Authentication System**: Role-based access control with secure login and session management using JWT.
- **Database Management**: MySQL database with data normalization and integrity checks.
- **API Integration**: RESTful APIs for communication between modules, documented using Swagger.

## Project Structure

```
erp-system-backend
├── src
│   ├── config          # Database configuration
│   ├── controllers     # Business logic for handling requests
│   ├── index.js        # Main entry point of the application
│   ├── middleware       # Authentication and authorization middleware
│   ├── models          # Sequelize models for database entities
│   ├── routes          # API route definitions
├── .env.example        # Example environment variables
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation
```

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd erp-system-backend
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Configure environment variables**:
   - Copy `.env.example` to `.env` and update the values for your database configuration and JWT secret.

4. **Run the application**:
   ```
   npm run dev
   ```

5. **Access the API documentation**:
   - Open your browser and navigate to `http://localhost:3000/api-docs` to view the Swagger documentation.

## Usage Guidelines

- **User Registration**: Only admin users can create new accounts via the `/auth/register` endpoint.
- **Login**: Users can log in using the `/auth/login` endpoint to receive a JWT for authentication.
- **Role-Based Access**: Different roles (Admin, Student, Staff, Instructor, HR Manager, Accountant, Marketing Officer) have specific access rights to various endpoints.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.