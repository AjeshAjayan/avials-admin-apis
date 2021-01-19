const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
const { sendPasswordThruMail } = require('../../../common');

module.exports = {
    /**
     * Create a record.
     *
     * @return {Object}
     */

    async create(ctx) {

        const createUser = async (data) => {
            /**@type {String} */
            const fullname = data.fullname;
            const password = `${fullname.replace(' ').toLowerCase()}@avials${Math.floor(Math.random() * 1000)}`;
            const userData = {
                username: data.email,
                email: data.email,
                password: password
            };
            await sendPasswordThruMail(data.email, password);
            const user = await strapi.query("user", "users-permissions").create(userData)
            return user
        };

        let entity;
        let userEntiry;
        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);
            userEntiry = await createUser(data);
            data.users_permissions_user = userEntiry;
            entity = await strapi.services.managers.create(data, { files });
        } else {
            userEntiry = await createUser(ctx.request.body);
            ctx.request.body.users_permissions_user = userEntiry;
            entity = await strapi.services.managers.create(ctx.request.body);
        }
        return sanitizeEntity(entity, { model: strapi.models.managers });
    },

    async createUser(ctx) {

        if (ctx.model == 'managers' && ctx.event === 'entry.create') {
            /**@type {String} */
            const fullname = data.fullname;
            const password = `${fullname.replace(' ').toLowerCase()}@avials${Math.floor(Math.random() * 1000)}`;
            const userData = {
                username: data.email,
                email: data.email,
                password: password
            };
            await sendPasswordThruMail(data.email, password);
            const user = await strapi.query("user", "users-permissions").create(userData)

            const manager = await strapi.services.managers.update(
                {
                    id: ctx.entry.id
                },
                {
                    ...ctx.entry,
                    users_permissions_user: user
                }
            );

            return manager;
        }
    }
};