# Book Management Webapp

## Overview

This is a full-stack Book Management Webapp built with modern web technologies. The application is designed to provide comprehensive book and sales management functionalities for users and administrators. Users can manage books and track sales, while administrators have additional capabilities to manage users.

## Features

### User Roles
- **User:** Can manage books and sales.
- **Admin:** Can manage users in addition to book and sales management.

### Book Management
- Add, edit, and delete books.
- View book details.
- Search for books.

### Sales Management
- Track book sales.
- View sales statistics.
- Generate sales reports.

### User Management (Admin)
- Manage user accounts.
- Assign and remove roles.
- Monitor user activity.

## Technology Stack

### Frontend
- **React:** A JavaScript library for building user interfaces.
- **Redux Toolkit:** A toolset for efficient Redux development.
- **RTK Query:** Advanced data fetching and caching tool for Redux.
- **Typescript:** A superset of JavaScript that adds static typing.

### Backend
- **Express:** A minimal and flexible Node.js web application framework.
- **Mongoose:** Elegant MongoDB object modeling for Node.js.
- **MongoDB:** A NoSQL database known for its flexibility and scalability.
- **Zod:** TypeScript-first schema declaration and validation library.

### Deployment
- **Vercel:** A platform for frontend frameworks and static sites, perfect for React applications.

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

1. Clone the repository
    ```bash
    git clone https://github.com/yourusername/book-management-webapp.git
    cd book-management-webapp
    ```

2. Install dependencies for both frontend and backend
    ```bash
    cd client
    npm install
    cd ../server
    npm install
    ```

### Configuration

1. Create a `.env` file in the `server` directory with the following variables:
    ```plaintext
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```

### Running the Application

1. Start the backend server
    ```bash
    cd server
    npm run dev
    ```

2. Start the frontend development server
    ```bash
    cd client
    npm start
    ```

The application should now be running on `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend.

## Project Structure

### Client (React App)
