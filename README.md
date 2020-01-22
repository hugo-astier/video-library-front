# Video Library: React / Hooks / Suspense

Simple app created for learning purposes using React as well as its latest features: Hooks and Suspense. It's a video library, with the possibility of adding, editing, or deleting movies according to the user's privileges.<br>
It was initially a [tutorial](https://codewithmosh.com/p/mastering-react), but this tutorial wasn't using latest React's additions like Hooks and Suspense so I went ahead and modified the app to make use of them, and learnt them on the way.

This repo is only the front-end part of the app, you can find the RESTful API back-end [here](https://github.com/hugo-astier/video-library-back).

It uses:

- React, with Hooks and Suspense
- Node.js with Express for the Restful API
- MongoDB for the database
- Sentry for having logs in the cloud
- Heroku for cloud hosting

## Demo

[Demo available here on Heroku](https://video-library-front.herokuapp.com/) <br>
(There is a normal small delay the first time loading the app due to "waking-up" the Heroku dyno ([more info here](https://devcenter.heroku.com/articles/free-dyno-hours#dyno-sleeping)))

## Try it yourself

Pull the repo locally, then run `npm i` at the root to install `node_modules`.
You also need to have mongoDB installed and running on your machine, as well as [the back-end](https://github.com/hugo-astier/video-library-back) running too.

Then, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
