var { sendNoftication_Greetings } = require('../../../common');

module.exports = {
    send_greetings: async ctx => {
        try{
            await sendNoftication_Greetings()
            ctx.send({messages: "Success"})
        } catch(e) {
            console.log(e);
            ctx.send({messages: "Failed"})
        }
    }
}