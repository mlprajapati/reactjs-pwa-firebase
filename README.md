The main objective is that many sites send notifications to their users through the browser for various events occurring within the web app. We can easily do the job using Cloud Messaging, which allows us to send messages to any devices using HTTP requests with Firebase.
Here are the basic steps required, for pushing the notifications in Webapp using Firebase.
Firstly we have to create a PWA application to experience push notification feature.
This POC is a React based PWA Application.

## Firebase Account Creation

Use for firebase account creation and project setup [https://console.firebase.google.com](https://console.firebase.google.com).

## Use Firebase Message sender ID
To generate the push notification Token use your firebase message sender id with the application code.
``` bash

    # Add the message sender id within following files:
    public/firebase-messaging-sw.js
    # and
    src/push-notification.js

```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


## Deployment with your Firebase Account hosting
``` bash

npm install firebase-tools

firebase login

firebase init
#Follow the steps provied by the firebase cli.

firebase use --add
#This will create a new project or ask to choose from existing project.

firebase deploy --only hosting
#This will finally push the build source from build folder to the firebase hosting location and you will be provied with the hosted location to explore the application online.

```

## Get User Based Notification Token
    Push notification Token will generate after successful login. To get the generated token open the console and find the string like ''. Or we can get this from the localStorage key "notification-token" of the application url. 

## Validate Push Notification Using Postman
``` bash
    To validate the push notification use the google FCM service followed by below steps. 
    * Open Postman
    * With POST Url add the FCM service URL "https://fcm.google.apis.com/fcm/send"
    * Add Headers Properties
        - Authorization: key=[your firebase Server key]  (you can get this from the firebase project settings)
        - Content-Type: application/json

    * Add Body in JSON format
            {
            "notification": {
                "title": "Notification Title",
                "body": "Notification Body",
                "click_action": "http://localhost:3000",
                "icon": [Notification icon url],
                "show_in_foreground": true
            },
            "content_available": true,
            "to": [YOUR USER TOKEN]
            }
```
## Live URL for DEMO

[https://push-notification-poc-c88e7.firebaseapp.com](https://push-notification-poc-c88e7.firebaseapp.com)

