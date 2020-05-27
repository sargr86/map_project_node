require('../constants/sequelize');
const UsersCards = db.users_cards;
const moment = require('moment');

/**
 * Gets user data by request id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getUserById = async (req, res) => {
    let data = req.query;
    let result = await to(Users.findOne({
        where: {id: data.id},
        attributes: ['id', 'email', 'gender', 'profile_img', `first_name`, `last_name`, 'birthday', 'phone', 'google_user_id'],
        include: [
            {model: Roles, attributes: ['name_en']},
            {model: UsersCards}
        ]
    }), res);
    res.json(result)
};

/**
 * Gets user list
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getUsers = async (req, res) => {
    let data = req.query;
    let lang = data.lang;
    let attributes = ['id', 'email', 'gender', 'profile_img', 'birthday'];
    attributes.push(fullName(`first_name_${lang}`, `last_name_${lang}`));
    let result = await to(Users.findAll({
        attributes: attributes,
        include: [
            {model: UsersStatuses}
        ]
    }), res);
    res.json(result)
};

/**
 * Changes the selected user status
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.changeUserStatus = async (req, res) => {
    let data = req.body;
    let status = await UsersStatuses.findOne({where: {name_en: data.status}, attributes: ['id']});

    await Users.update({status_id: status.id}, {where: {id: data.id}});
    req.query = data;
    this.getUsers(req, res);
};

exports.getUsersByRole = async (req, res) => {
    let data = req.query;
    let attributes = [[sequelize.fn('concat', sequelize.col('first_name'), ' ', sequelize.col('last_name')), 'full_name'], 'id', 'phone', 'email', 'gender', 'profile_img', 'birthday'];

    let result = await to(Users.findAll({
        attributes: attributes,
        include: [
            {model: Positions, where: {name: data.position}},
            {model: Ferries, include: [{model: Companies}]},

        ],

    }), res);
    res.json(result)
};

exports.createStripeUserCard = async (req, res) => {

    let data = req.body;
    let stripeUserFound = await UsersCards.findOne({where: {user_id: data.user_id}});

    if (!stripeUserFound) {

        let customer = await stripe.customers
            .create({
                email: data.stripeEmail,
                // source: req.body.stripeToken,
            });

        await this.createStripeCard(data, customer.id);
        res.json('OK')

    } else {
        let card = {
            holder_name: data.holderName,
            number_part: data.last4,
            expiry_date: moment(data.exp_month + '/' + data.exp_year, 'MM/YYYY').format('MM/YYYY'),
            brand: data.brand,
            country: data.country
        };
        let stripeUserCardFound = await UsersCards.findOne({where: card});
        if (stripeUserCardFound) {
            res.status(500).json({msg: 'A card with such details already exists'})
        } else {
            await this.createStripeCard(data, stripeUserFound.stripe_customer_id);
            res.json('OK')
        }
    }
};

exports.createStripeUser = async (req, res) => {


};

exports.createStripeCard = async (data, customer_id) => {
    stripe.customers.createSource(
        customer_id,
        {source: data.stripeToken}).then(async (d) => {
        console.log(d)
        let userCard = {
            card_id: d.id,
            user_id: data.user_id,
            brand: d.brand,
            country: d.country,
            stripe_customer_id: d.customer,
            expiry_date: moment(d.exp_month + '/' + d.exp_year, 'MM/YYYY').format('MM/YYYY'),
            holder_name: d.name,
            number_part: d.last4
        };
        await UsersCards.create(userCard)
    });
};


exports.getCustomerCards = async (req, res) => {
    let data = req.query;
    let userCards = await UsersCards.findOne({where: {user_id: data.user_id}});
    if (userCards) {
        let cards = await stripe.customers.listSources(
            userCards.toJSON().stripe_customer_id,
            {object: 'card'},
            function (err, cards) {
                console.log(cards.data.length)
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.json(cards.data)
                }
            }
        );
    } else {
        res.status(500).json('This user doesn\'t have any cards registered in our system');
    }
};


exports.getCustomerInfo = async (req, res) => {
    let data = req.query;
    let userCards = await UsersCards.findOne({where: {user_id: data.user_id}});

    if (!userCards) {
        res.status(500).json('This user hasn\'t got any cards');
    } else {
        let customer = await stripe.customers.retrieve(
            userCards.toJSON().stripe_customer_id,
            function (err, customer) {
                // console.log(customer)
                res.json(customer)
                // asynchronously called
            }
        );
    }
};


exports.removeStripeCard = async (req, res) => {
    let data = req.body;

    await stripe.customers.deleteSource(
        data.stripe_customer_id,
        data.card_id,
        async (err, confirmation) => {
            if (confirmation.deleted) {
                await UsersCards.destroy({where: {user_id: data.user_id, card_id: data.card_id}});
                res.json('OK')
            }
        }
    );
};


exports.updateStripeCard = async (req, res) => {
    let data = req.query;

    await stripe.customers.updateSource(
        data.stripe_customer_id,
        data.card_id,
        {name: 'Jenny Rosen'},
        function (err, card) {
            // asynchronously called
        }
    );
};

exports.setCardAsDefault = async (req, res) => {
    let data = req.body;
    console.log('DEFAULT REQ QUERY!!!!!')
    console.log(req.body)
    const customer = await stripe.customers.update(
        data.customer_id,
        {
            default_source: data.card_id
        }, function (err, customer) {
            if (err) {

                console.log('!!!!!ERROR!!!!')
                console.log(err)
                res.status(500).json(err);
            } else {
                console.log(customer)
                res.json('OK');
            }
            // asynchronously called
        }
    );
    console.log('set card as default')

};


exports.payViaPaypal = async (req, res) => {
    console.log(req.query)

    console.log(process.env.API_URL)

    let create_payment_json = {
        intent: "sale",
        payer: {
            payment_method: "paypal"
        },
        redirect_urls: {
            return_url: process.env.API_URL+"paypal/paypal-success?price=" + req.query.price,
            cancel_url: process.env.API_URL+"cancel"
        },
        transactions: [
            {
                item_list: {
                    items: [
                        {
                            name: "item",
                            sku: "item",
                            price: req.query.price + ".00",
                            currency: "USD",
                            quantity: 1
                        }
                    ]
                },
                amount: {
                    currency: "USD",
                    total: req.query.price + ".00"
                },
                description: "This is the payment description."
            }
        ]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment.links[1].href);
            res.redirect(payment.links[1].href);
        }
    });
};

exports.paypalPaymentSuccess = (req, res) => {
    // res.send("Success");
    console.log(req.query.price);

    var PayerID = req.query.PayerID;
    var paymentId = req.query.paymentId;
    var execute_payment_json = {
        payer_id: PayerID,
        transactions: [
            {
                amount: {
                    currency: "USD",
                    total: req.query.price+".00"
                }
            }
        ]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function(
        error,
        payment
    ) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            res.render("success");
        }
    });
};
