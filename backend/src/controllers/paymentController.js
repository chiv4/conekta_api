const conektaService = require('../services/conektaService');

function removeCircularReferences(obj) {
    const seen = new WeakSet();
    return JSON.parse(JSON.stringify(obj, (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    }));
}

exports.createCharge = async (req, res) => {
    try {
        const charge = await conektaService.createCharge(req.body);
        res.status(200).json(removeCircularReferences(charge));
    } catch (error) {
        console.error("❌ Error al crear el cargo:", error);

        // Usamos el statusCode del error para responder adecuadamente
        res.status(error.statusCode || 500).json({ success: false, error });
    }
};
