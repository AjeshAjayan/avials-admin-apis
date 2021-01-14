var admin = require('firebase-admin');
require('./fcm_notification');

var sendNoftication_Greetings = async () => {
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

    try {
        var response = await admin.messaging().send(message);
        console.log('Successfully sent message:', response);
    } catch (e) {
        console.log(e);
        console.log('Error sending message:', e);
    }
}

module.exports = {
    sendNoftication_Greetings
}
