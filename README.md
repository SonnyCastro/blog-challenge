# Blog Challenge

A MERN stack blog with the following features:

- Authentication system for authors to create an account and login/logout
- Authors can create, update and delete blog posts, update their account and blog information, and delete their account.
- Anyone can submit comments on any post; it is not required to be logged-in to do so. If a commenter does not fill out the name field, they will appear as 'anonymous'.
- There is a list of all blogs to choose which one to start reading
- Each blog has a title, description, the author name and a preview of all their posts
- Blog was styled using the Bootstrap library modified with custom CSS

<hr/>

### Installation & Run Instructions

- `git clone` the repo
- `yarn install` in both root and client directories
- `yarn dev` to run both servers

There is a seed file available if you would like to populate your blog with pre-made data! Just run `nodemon server/db/seeds/index.js` from the root directory.

You will also need a .env file with a MongoDB URL to connect to your database, and a JWT secret for the JSON Web Token authentication.

<hr/>

### Dependencies

App uses on the front end:

- axios
- bootstrap & react-bootstrap
- moment
- react-dom
- react-router-dom

App uses on the back end:

- bcryptjs
- concurrently
- cookie-parser
- dotenv
- express
- faker
- jsonwebtoken
- mongodb & mongoose
- nodemon
- passport & passport-jwt
