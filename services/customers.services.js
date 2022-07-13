
const boom = require('@hapi/boom');

//const getConnection = require('../libs/postgres');

const { models } = require('../libs/sequelize');


class CustomersService {
    constructor() {

    }

    async create(data){
        //const newUser = await models.User.create(data.user);
        const newCustomer = await models.Customer.create(data,{
            include: ['user']
            /* ...data,
            userId: newUser.id */
        });
        return newCustomer;
    }

    async find(){
        const rta = await models.Customer.findAll({
            include: ['user']
        });
        return rta;
    }

    async findOne(id){
        const customer = await models.Customer.findByPk(id);
        if(!customer){
            throw boom.notFound('customer not found');
        }
        return customer
    }

    async update(id, changes){
        const customer = await this.findOne(id);
        const rta =  await customer.update(changes);
        return rta
    }

    async delete(id){
        const customer = await this.findOne(id);
        await customer.destroy();
        return { id };
    }
}

module.exports = CustomersService;