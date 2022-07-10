const faker = require('community-faker');
const boom = require('@hapi/boom');

class ProductsService {
    constructor() {
        this.products = [];
        this.generate();
    }

    generate(){
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
    }

    async create(data){
        const newProduct = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.products.push(newProduct);
        return newProduct;
    }

    async find(){
        return this.products;
    }

    async findOne(id){
        const product = this.products.find(p => p.id === id);
        if(!product){
            throw boom.notFound('Product not found');
        }
        if(product.isBlock){
            throw boom.conflict('Product is blocked');
        }
        return product;
    }

    async update(id, changes){
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            throw boom.notFound('Product not found');
        }
        const product = this.products[index];
        this.products[index] = {
            ...product,
            ...changes
        };
        return this.products[index];
    }

    async delete(id){
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            throw boom.notFound('Product not found');
        }
        this.products.slice(index, 1);
        return { id };
    }
}

module.exports = ProductsService;