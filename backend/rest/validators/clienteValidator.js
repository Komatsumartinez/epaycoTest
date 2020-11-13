const Joi = require('@hapi/joi')

const clienteValidator = (data) => {

    const dataSchema = Joi.object({
        documento: Joi.string()
            .alphanum()
            .min(4)
            .max(12)
            .required(),

        nombres: Joi.string()
            .min(3)
            .max(40)
            .required(),
       //repeat_password: Joi.ref('password'),

        mail: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

        // celular patron 000-000-
        celular: Joi.number()
            .min(100000000)
            .max(999999999)
            .required()
            
})

return dataSchema.validate(data);

}
module.exports = clienteValidator