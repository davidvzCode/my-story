//const faker = require('community-faker');
const boom = require('@hapi/boom');

const { Op }  = require('sequelize');
const { models } = require('../libs/sequelize');

class ProductsService {
    constructor() {
        //this.products = [];
        //this.generate();
        /* this.pool = pool;
        this.pool.on('error', err => console.log(err)); */
    }

    /* generate(){
        const limit = 100;
        for (let i = 0; i < limit; i++) {
            this.products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(),10),
                description: faker.commerce.productDescription(),
                isBlock: faker.datatype.boolean(),
            });
        }
    } */

    async create(data){
        const newProduct = await models.Product.create(data);
        return newProduct;
    }

    async find(query){
        const options = {
            include: ['category'],
            where: {}
        };
        const { limit, offset, price, price_min, price_max } = query;
        if(limit && offset){
            options.limit= limit;
            options.offset= offset;
        }

        if(price){
            options.where.price = price;
        }

        if(price_min && price_max){
            options.where.price = {
                [Op.gte]: price_min,
                [Op.lte]: price_max,
            };
        }
        
        const rta = await models.Product.findAll(options);
        return rta;
    }

    async findOne(id){
        const product = await models.Product.findByPk(id);
        if(!product){
            throw boom.notFound('product not found');
        }
        return product
    }

    async update(id, changes){
        const product = await this.findOne(id);
        const rta =  await product.update(changes);
        return rta
    }

    async delete(id){
        const product = await this.findOne(id);
        await product.destroy();
        return { id };
    }
}

module.exports = ProductsService;