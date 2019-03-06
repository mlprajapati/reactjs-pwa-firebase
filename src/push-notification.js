import * as firebase from "firebase";
import axios from "axios";

export const initializeFirebase = () => {
  const config = {
    messagingSenderId: "75066325138"
  };
  firebase.initializeApp(config);
  // navigator.serviceWorker.register("/service-worker.js").then(registration => {
  //   firebase.messaging().useServiceWorker(registration);
  // });
};
export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log("token :", token);
    localStorage.setItem("notification-token", token);
    axios.put(
      "https://jwrr2fa8mf.execute-api.us-east-1.amazonaws.com/p3/notificationtoken",
      {
        owner: "madan@hcl.com",
        notificationToken: token.toString()
      }
    );
    return token;
  } catch (error) {
    console.error(error);
  }
};
