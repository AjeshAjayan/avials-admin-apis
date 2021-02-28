'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async shopDetails(ctx) {
        const shopId = ctx.params.id;
        const shop = await strapi.query('shop-user').findOne({ id: shopId }, ['place']);
        const shopPlaceId = shop.place.id

        // get delivery boys names
        /**@type {Array.<Object>} */
        let deliveryBoys = await strapi.query('delivery-partners').find({ place: shopPlaceId }, []);
        deliveryBoys = deliveryBoys.map(d => d.fullname);

        // get total no of orders
        const totalNoOfOrders = await strapi.query('order-child').count({ shop_user: shopId })
        const noOfPendingOrders = await strapi.query('order-child').count({ shop_user: shopId, is_delivered: false })
        const noOfCompletedOrders = await strapi.query('order-child').count({ shop_user: shopId, is_delivered: true })
        const noOfProducts = await strapi.query('shop-products').count({ shop_user: shopId })

        return {
            deliveryBoys,
            totalNoOfOrders,
            noOfPendingOrders,
            noOfCompletedOrders,
            noOfProducts,
        };
    }
};