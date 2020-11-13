const Joi = require('@hapi/joi')

const billeteraValidator = (data) => {

    const dataSchema = Joi.object({
        confirma_token: Joi.number()
            .min(000000)
            .max(999999),
            //.required(),
        saldo: Joi.number()
            .min(0)
            .max(999999999)
        //    .required(),
       //repeat_password: Joi.ref('password'),
    
})

return dataSchema.validate(data);

}
module.exports = billeteraValidator