const conekta = require('conekta');

conekta.api_key = 'key_j1kpz3PW7Vnma67KLXEyUvY';
conekta.api_version = '2.0.0';

exports.createCharge = async (chargeData) => {
    return new Promise((resolve, reject) => {
        conekta.Order.create(chargeData, (err, res) => {
            if (err) {
                console.error("error", err);
                reject(err);
            }else{
            resolve(res);
            }
        });
    });

};
