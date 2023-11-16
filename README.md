# Hurmaava-Shop-2.0
A simple web shop to handle customer orders of custom made clothing items. Version 2.0 includes an admin dashboard. 

To get started, please follow these instructions:


## Prerequisites

1. **Node Modules**: Make sure you have Node.js and npm (Node Package Manager) installed on your system. You can download them from [Node.js](https://nodejs.org/).

## Installation

1. **Clone this repository to your local machine**

```javascript
git clone https://github.com/bereniikke/Hurmaava-Shop-2.0
```

2. **Navigate to the project's directory**


4. **Install required Node modules and dependencies:**

Install modules for frontend and backend, respectively.

For backend, install the following dependencies:

```javascript
npm install express mongoose body-parser cors
```

For frontend, install the following dependencies:

```javascript
npm install react react-dom react-scripts react-router-dom
```

## Database Configuration

1. **Create a file named `env.js` in the root directory of your project.**

2. **Inside `env.js`, add your MongoDB database configuration as follows:**

```javascript
//env.js
module.exports = {
  MONGODB_URI: "your-mongodb-uri-here"
};
```

Replace "your-mongodb-uri-here" with your actual MongoDB connection string.

## Admin Dashboard Configuration

1. **Create a file named `users.js` in the 'src' directory.**

2. **Inside `users.js`, add your admin username and password as follows:**
   
```javascript
//users.js
module.exports = {
    ADMIN_USERNAME: 'your-username-here',
    ADMIN_PASSWORD: 'your-password-here',
  };
  
```


## Start the application

Once you have installed the required modules and configured your database and admin credentials, you can start the application with the following commands:

Start the backend:

```javascript
node app.js
```

Start the frontend:

```javascript
npm start
```

Your web shop app should now be running locally. Access it by opening a web browser and navigating to:

```javascript
http://localhost:3000
```

If you have any questions or feedback regarding the web shop app, please feel free to contact us. We appreciate your input!
