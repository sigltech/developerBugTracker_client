[![Netlify Status](https://api.netlify.com/api/v1/badges/9b17d1e3-9a63-4a49-a705-9ed995cb69fa/deploy-status)](https://app.netlify.com/sites/siglbug-tracker/deploys)
# Bug Tracking System Client

## Introduction

This application is a simple bug tracking system. It allows admins to create bugs, assign them to developers, and allos all users to track their progress. It also allows developers to view bugs assigned to them and mark them as resolved.

## Installation(local)

1. Clone the repository
2. Run `npm install` in the root directory
3. run `npm start` in the root directory to start the client server on port 3000
4. In order to use the application, users must first clone the server repository and follow the instructions in the README.md file to start the server. Alternatively, the application can be used with the deployed server and client. **This has yet to be implemented but will be done soon once the MVP is completed**.

## Usage

1. The application is a single page application. The user is presented with a login screen. If the user does not have an account, an admin must create one for them. Once logged in, the user is presented with a list of bugs. If the user is an admin, they can create new bugs, assign them to developers, and mark them as resolved. If the user is a developer, they can view bugs assigned to them and mark them as resolved.

## Technologies Used for the Client

1. React
2. Redux
3. React Router
4. Axios
5. Tailwind CSS

## Features still to be implemented

1. The ability to create new users from within the application as an admin
2. Mobile responsiveness
3. The ability to mark bugs as resolved from the bug list
4. The ability to view bugs assigned to a developer from the bug list
5. The ability to filter bugs by assigned developer
6. The ability to filter bugs by status
7. The ability to filter bugs by priority
8. The ability to filter bugs by date created
9. The ability to filter bugs by date updated
10. The ability to filter bugs by date resolved


