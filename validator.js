function validateRequired(body, fields = []) {
    const errors = [];

    fields.forEach(field => {
        if (
            body[field] === undefined ||
            body[field] === null ||
            body[field] === ""
        ) {
            errors.push({
                field,
                message: `${field} is required`
            });
        }
    });

    return errors;
}

function validateSchema(body, schema = {}) {
    const errors = [];

    Object.entries(schema).forEach(([field, rules]) => {
        const value = body[field];

        if (rules.required && !value) {
            errors.push({
                field,
                message: rules.message || `${field} is required`
            });
            return;
        }

        if (!value) return;

        if (rules.type && typeof value !== rules.type) {
            errors.push({
                field,
                message: `${field} must be ${rules.type}`
            });
        }

        if (rules.min && value.length < rules.min) {
            errors.push({
                field,
                message: `${field} must be at least ${rules.min}`
            });
        }

        if (rules.email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regex.test(value)) {
                errors.push({
                    field,
                    message: `${field} must be valid email`
                });
            }
        }
    });

    return errors;
}

module.exports = {
    validateRequired,
    validateSchema
};