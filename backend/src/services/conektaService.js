const conekta = require('conekta');

conekta.api_key = 'key_j1kpz3PW7Vnma67KLXEyUvY';
conekta.api_version = '2.0.0';

exports.createCharge = async (chargeData) => {
    return new Promise((resolve, reject) => {
        conekta.Order.create(chargeData, (err, res) => {
            if (err) {
                console.error("❌ Error en Conekta:", err);

                // Extraer el mensaje y el código de error específico de Conekta
                const errorCode = err.details?.[0]?.code || "unknown_error";
                const errorMessage = err.details?.[0]?.message || "Error desconocido en Conekta";

                // Definir respuestas según el tipo de error
                let userMessage = "Ocurrió un error con el pago.";
                let statusCode = 400;

                switch (errorCode) {
                    case "card_declined":
                        userMessage = "La tarjeta fue rechazada. Intente con otra.";
                        break;
                    case "insufficient_funds":
                        userMessage = "Fondos insuficientes en la tarjeta.";
                        break;
                    case "stolen_card":
                        userMessage = "La tarjeta ha sido reportada como robada.";
                        break;
                    case "invalid_cvc":
                        userMessage = "El código de seguridad (CVC) es incorrecto.";
                        break;
                    case "invalid_expiry_date":
                        userMessage = "La fecha de expiración es inválida.";
                        break;
                    case "processing_error":
                        userMessage = "Hubo un problema al procesar el pago. Intente nuevamente.";
                        break;
                    default:
                        userMessage = "Error de pago desconocido. Intente nuevamente.";
                        statusCode = 500;
                        break;
                }

                reject({ message: userMessage, code: errorCode, statusCode });
            } else {
                resolve(res);
            }
        });
    });
};
