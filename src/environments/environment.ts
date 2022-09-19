// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'lartic-app',
    appId: '1:199035419744:web:da8eb9fbea8e55b2081705',
    storageBucket: 'lartic-app.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyAzmPva8lNiZ74PsbtXsiYeeSjBkJ0T2fg',
    authDomain: 'lartic-app.firebaseapp.com',
    messagingSenderId: '199035419744',
    measurementId: 'G-03D671625P',
  },
  production: false,
  api: 'http://192.168.88.23:3000/api/',
  socket: 'http://192.168.88.23:5000/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
