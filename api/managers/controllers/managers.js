const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
const { sendPasswordThruMail } = require('../../../common');

module.exports = {
    /**
     * Create a record.
     *
     * @return {Object}
     */

    async create(ctx) {

        let entity;
        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);
            entity = await strapi.services.managers.create(data, { files });
        } else {
            ctx.request.body.users_permissions_user = userEntiry;
            entity = await strapi.services.managers.create(ctx.request.body);
        }
        return sanitizeEntity(entity, { model: strapi.models.managers });
    },

    async getByUserId(ctx) {
        const response = await strapi.services.managers.find({ users_permissions_user: ctx.params.userId });
        return sanitizeEntity(response, { model: strapi.models.managers })
    }
};