// Firebase's standard PUBLIC web configuration. Not a service-account key.
// Database security is enforced by Authentication + Realtime Database Rules.
export const firebaseConfig = {
  "apiKey": "AIzaSyARFsdjF6VrcQkaR8trPahgbaQOkjqj_Oo",
  "authDomain": "cybersecurityclassdemo.firebaseapp.com",
  "databaseURL": "https://cybersecurityclassdemo-default-rtdb.firebaseio.com",
  "projectId": "cybersecurityclassdemo",
  "storageBucket": "cybersecurityclassdemo.firebasestorage.app",
  "messagingSenderId": "1085956408680",
  "appId": "1:1085956408680:web:dbe1a0af83384d1a0802dd",
  "measurementId": "G-JLLY5XKKC3"
};
export const isFirebaseConfigured = () => Object.values(firebaseConfig).every(Boolean);
