var admin = require("firebase-admin");

var serviceAccount = require("./avials-fcm-firebase-adminsdk-anat0-25b03f1dda.json");

console.log('****FIREBASE****');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var topic = 'greetings';

    var message = {
        notification: {
            title: 'Good evening',
            body: 'some quote for evening'
        },
        topic: topic
        // data: {
        //     score: '850',
        //     time: '2:45'
        // },
    };

    admin.messaging().send(message).then((response) => {
      console.log('Successfully sent message:', response);
    }).catch((e) => {
      console.log('Error sending message:', e);
    })