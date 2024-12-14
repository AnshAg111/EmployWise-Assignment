Here's the updated `README.md` with the Vercel deployment link added:

```markdown
# React User Management System

This is a simple User Management System built with React that allows users to view, edit, and update user information. The project uses a REST API to interact with user data and features user authentication, data fetching, and state management using React Context API.

## Features

- View user details
- Edit user details (first name, last name, email)
- Display success and error messages with Toast notifications
- User authentication with token-based authorization
- Loading spinner while fetching data
- Responsive design with Material-UI components

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **React Router**: For routing and navigation within the application.
- **Material-UI**: For building the UI with pre-built components.
- **Context API**: For state management (AuthContext and ToastContext).
- **Fetch API**: For making HTTP requests to interact with the backend API.

## Getting Started

### Prerequisites

Ensure that you have the following installed on your local machine:

- Node.js (>= 16.0)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/user-management-system.git
   ```

2. Navigate to the project folder:

   ```bash
   cd user-management-system
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

   Or, if you're using yarn:

   ```bash
   yarn install
   ```

### Running the Application

1. Start the development server:

   ```bash
   npm start
   ```

   Or:

   ```bash
   yarn start
   ```

2. Open your browser and go to:

   ```
   http://localhost:3000
   ```

### Live Demo

You can view the live version of this project [here](https://employ-wise-assignment-mu.vercel.app/).

### API Integration

This application integrates with a mock API (`https://reqres.in/api/users/`) to fetch and update user data. It uses the following endpoints:

- `GET /api/users/{id}`: Fetch a user by ID.
- `PUT /api/users/{id}`: Update a user's details.

