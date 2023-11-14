# Solution

This solution is for the hipages Full Stack Engineer Tech Challenge. The task was to create a lead management UI for a tradie as a single page application (SPA) using a modern JS framework.

## Design Choices

### UI Design

For the UI, I used Material UI to style the components because it provides a rich set of pre-designed components that are easy to use and customize, which should have helped me save time on styling and focus more on the functionality.

Due to time constraints, I've only implemented a basic UI. I would have worked more on making it look like the screenshots, including using suburbs and categories rather than just their ids.

### State Management

If I had more time, I would have implemented a state management solution to manage the application state. In the context of Angular, a good choice could be NgRx or even Angular's built-in services combined with RxJS.

Using a state management solution like NgRx or services with RxJS would allow me to handle complex state interactions in a more predictable way. It would provide a single source of truth for the application state, making the state easier to track and manage.

This would make the application more scalable and easier to maintain as it grows in complexity.

### API Calls

I used Angular's HttpClient to make API calls to the server. HttpClient is a built-in way to make HTTP requests in Angular and includes powerful features like testability features, typed request and response objects, request and response interception, Observable APIs, and streamlined error handling.

In the `JobService` service, I used HttpClient to interact with the job-related endpoints of the backend API. I made GET requests to fetch accepted and invited jobs, and PUT requests to accept or decline a job. I used RxJS's `catchError` operator to handle any errors that occur during these requests.

This approach allowed me to keep all API-related logic in one place, making the code easier to understand and maintain.

## Additional Features

Given more time, I would have implemented the following additional features:

1. **Suburbs and Categories**: I would have worked on both the backend and frontend to use suburbs and categories instead of just their ids. This would have made the application more user-friendly, as the users would see meaningful information instead of just ids. It would also make the application more closely match the provided screenshots.
2. **UI Improvements**: The current UI is quite basic due to time constraints. Given more time, I would have invested in improving the UI to make it look more professional and more like the provided screenshots.

## Running the App

To run the app, follow these steps:

1. Navigate to the server folder and fill out the `.env` file with the following details:
    ```properties
    NODE_ENV=development
    CORS_ORIGIN=http://localhost:port
    PORT=8080
    DB_NAME=databasename
    DB_USER=username
    DB_PASSWORD=password
    DB_HOST=127.0.0.1
    ```
    Then, run the command `npm install` to install the necessary dependencies. After that, run the command `npm run start` to start the server.

2. Navigate to the UI folder and run the command `npm install` to install the necessary dependencies. After that, run the command `npm run start` to start the frontend application.

Please note that you need to have Node.js and npm installed on your machine to run the app.
