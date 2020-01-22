# Video Library: React / Hooks / Suspense

Simple app created for learning purposes using React as well as its latest features: Hooks and Suspense. It's a video library, with the possibility of adding, editing, or deleting movies according to the user's privileges.

It was initially a [tutorial](https://codewithmosh.com/p/mastering-react), but this tutorial wasn't using latest React's additions like Hooks and Suspense so I went ahead and modified the app to make use of them, and learnt them on the way.

This repo is only the front-end part of the app, you can find the RESTful API back-end [here](https://github.com/hugo-astier/video-library-back).<br><br>

**Tech stack:**

- React, with Hooks and Suspense
- Node.js with Express for the Restful API
- MongoDB for the database
- Sentry for having logs in the cloud (->unexpected errors)
- Heroku for cloud hosting<br><br>

**As simple as an app it is, it demonstrates many techniques around React such as:**

- Composing components and passing data through them
- Routing
- Handling forms with validation
- Handling errors
- Data fetching (RESTful API)
- Authentication and Authorization (JWT)
- [Hooks](https://reactjs.org/docs/hooks-intro.html)! Using built-in Hooks like useState and useEffect but also by creating custom Hooks to reuse stateful business logic
- [Suspense for Data Fetching!](https://reactjs.org/docs/concurrent-mode-suspense.html)<br><br>

_Note: This project uses an experimental build of React in order to use Suspense for Data Fetching, but this feature will be added to the stable release very soon. It also uses babel plugins for [the optional chaining](https://github.com/tc39/proposal-optional-chaining) and [the nullish coalescing operator](https://github.com/tc39/proposal-nullish-coalescing) ES proposals, both in stage 4 now so ready for inclusion in the formal ECMAScript standard._

## Demo

[Demo available here on Heroku](https://video-library-front.herokuapp.com/) <br>
(There is a normal small delay the first time loading the app due to "waking-up" the Heroku dyno ([more info here](https://devcenter.heroku.com/articles/free-dyno-hours#dyno-sleeping)))<br><br>
Privileges:

- Guest: Can look through and search for movies
- Registered user: Guest priveleges + can add and edit movies
- Admin: Registered user privileges + can delete movies.<br>
  For now there is only one admin user:
  - email: admin@gmail.com
  - password: 12345

## Setup

Pull the repo locally, then run `npm i` at the root to install `node_modules`.
You also need to have mongoDB and [the back-end](https://github.com/hugo-astier/video-library-back) up and running on your machine too.<br>

Then, you can run:

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

_Also_, to give admin privileges to a user, set directly in MongoDB to this user an extra property "isAdmin" to true(boolean).

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
