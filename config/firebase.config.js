const admin = require("firebase-admin");

// const serviceAccount = require("./serviceAccountKey.json");
const firebaseConfig = {
  apiKey: "AIzaSyAGnNTfWd41Ugix8Fwjp0EAZzFYF4qXibY",
  authDomain: "crud-app-firebase-af87d.firebaseapp.com",
  databaseURL: "https://crud-app-firebase-af87d-default-rtdb.firebaseio.com",
  projectId: "crud-app-firebase-af87d",
  storageBucket: "crud-app-firebase-af87d.appspot.com",
  messagingSenderId: "394785553279",
  appId: "1:394785553279:web:47bfaf36aee434be43384a",
};
admin.initializeApp(firebaseConfig);

module.exports = admin;
