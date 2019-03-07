import * as firebase from 'firebase';




  // Initialize Firebase
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  };

  firebase.initializeApp(config);

  const database = firebase.database();
  // providers provide authentication
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export { googleAuthProvider, firebase, database as default };




// // SUBSCRIBE to the database
// database.ref().on('value', (snapshot) => {
//     console.log(snapshot.val());
// });

// ====================================

// // SET the database
// database.ref().set({
//     name: 'Justin Brooks',
//     age: 24 ,
//     stressLevel: 8,
//     job: {
//         title: 'Software developer' ,
//         company: ''
//     } ,
//     location: {
//         city: 'Greenville' ,
//         country: 'United States'
//     }
// }).then(() => {
//     console.log('Data is saved!');
// }).catch((e) => {
//     console.log('Did not save data', e);
// });

// ====================================

// // UPDATE the database
// database.ref().update({
//     stressLevel: 10 ,
//     'job/comapny': 'None' ,
//     'location/city': 'Greenville'
// });

// ====================================

// // REMOVE the databse
// database.ref('stressLevel').remove()
// .then(() => {
//     console.log('Data was removed');
// }).catch((e) => {
//     console.log('Did not remove data', e);
// });

// ====================================

// // FETCH the database
// database.ref().once('value')
// .then((snapshot) => {
//     const val = snapshot.val();
//     console.log(val);
// })
// .catch((e) => {
//     console.log('Error fetching data', e);
// });

// ====================================

// // MAKE AN ARRAY of data in firebase
// database.ref('expenses').push({
//     description: 'Rent',
//     note: '',
//     amount: 109500,
//     createdAt: 4532452365
// });

// ====================================

// database.ref('expenses').push({
//     description: 'Phone Bill',
//     note: '',
//     amount: 109500,
//     createdAt: 4532452365
// });

// // SUBSCRIBE to an array 
// database.ref('expenses').on('value', (snapshot) => {
//     const expenses = [];

//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });
//     console.log(expenses);
// });

// ====================================

// // How to remove an array object - use 'child_removed'
// database.ref('expenses').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// // How to change an array object - use 'child_changed'
// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// // How to add an array object - use 'child_added'
// database.ref('expenses').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });


