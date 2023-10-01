# BlogWorld

This Blogging Application is a full-stack web app developed using Node.js, Express, Mongoose, and React. It allows users to write, delete, and categorize blog posts. The application also provides user authentication, allowing users to sign up and log in. Built with a focus on simplicity and functionality, it provides a seamless blogging experience for both readers and writers.

## Features

- **User Authentication:** Users can sign up and log in securely to manage their blog posts.
- **Create and Edit Posts:** Users can create new blog posts, edit existing ones, and categorize them by topic.
- **Delete Posts:** Unwanted posts can be easily deleted, keeping the blog organized.
- **Rich Text Editing:** The application features a user-friendly editor powered by the `react-quill` library, allowing bloggers to format their content easily.
- **Category Filtering:** Users can filter blog posts based on categories, making it easier to find posts of interest.
- **Responsive Design:** The frontend is designed to be responsive, ensuring a great user experience across devices.
- **Context API:** The application utilizes React's Context API for state management, ensuring efficient data flow between components.
- **File Upload:** The app supports image uploads for blog post thumbnails, enhancing the visual appeal of posts.
- **Security:** Security measures, including authentication and data validation, are implemented to protect user data and maintain the integrity of the application.

## Technologies Used

### Backend

- **Node.js:** JavaScript runtime environment for executing server-side code.
- **Express.js:** Web application framework for Node.js, providing robust features for building APIs and web applications.
- **Mongoose:** MongoDB object modeling tool, essential for interacting with MongoDB databases.
- **Multer:** Middleware for handling `multipart/form-data`, enabling file uploads.
- **Cors:** Middleware for enabling Cross-Origin Resource Sharing, ensuring secure communication between frontend and backend.

### Frontend

- **React:** JavaScript library for building user interfaces.
- **React Router DOM:** Declarative navigation and routing for React applications.
- **react-quill:** React wrapper for the Quill rich text editor, enhancing the blogging experience.
- **Context API:** State management solution for efficient data sharing between components.

## Setup and Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ashwani312/BlogWorld
   ```

2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```

4. Configure environment variables:

   Create a `.env` file in the backend directory and set the necessary environment variables, including database connection details and secret keys.

5. Run the application:

   - Start the backend server:

     ```bash
     cd backend
     npm start
     ```

   - Start the frontend development server:

     ```bash
     cd frontend
     npm start
     ```

   Access the application in your browser at `http://localhost:3000`.

## Screenshots

(Insert screenshots or GIFs demonstrating the application's functionality and design here.)

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

**Happy Blogging! 🚀**
