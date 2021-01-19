'use strict';
const { sendPasswordThruMail } = require('../../../common');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    lifecycles: {
        async beforeCreate(data) {
            const fullname = data.fullname;
            const password = `${fullname.replace(' ', '').toLowerCase()}@avials${Math.floor(Math.random() * 1000)}`;
            const userData = {
                username: data.email,
                email: data.email,
                password: password
            };
            await sendPasswordThruMail(data.email, password);
            const user = await strapi.query("user", "users-permissions").create(userData)
            data.users_permissions_user = user;
        },
    },
};
