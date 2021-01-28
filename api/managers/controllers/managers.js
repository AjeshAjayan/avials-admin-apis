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
    },

    async getManagerOrders(ctx) {
        try {
            let start = ctx.query._start;
            let limit = ctx.query._limit;
            let id = ctx.params.id;

            if (!start || !limit) {
                return ctx.send({
                    message: '_limit and _start is expected'
                }, 400);
            }

            /**@type {Array} */
            let response = await strapi.services.orders.find({ manager: id , _start: start, _limit: limit }, [
                'public_user',
                'public_user.place',
                'public_user',
                'public_user.profile_pic',
                'order_children.shop_user',
                'order_children.shop_user.shop_name',
                'order_children.public_user',

            ]);

            return sanitizeEntity(response, { model: strapi.models.orders });
        } catch (e) {
            console.log('error getManagerOrders', e);
        }
    }
};