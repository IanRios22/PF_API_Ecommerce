import app from '../../server.js';
import request from 'supertest';
import mongoose from 'mongoose';
import { fakerES as faker } from '@faker-js/faker';


describe('Test integrales para router products', () => {
    beforeAll(async () => {
        await mongoose.connection.collections["products"].drop();

    });

    test('[POST] /api/products', async () => {
        const body = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            stock: faker.number.int({ min: 0, max: 200 })
        }
        const response = await request(app).post('/api/products').send(body);
        expect(response.body.data._id).toBeDefined();
        expect(response.body.data).toHaveProperty("_id");
        expect(response.statusCode).toBe(200);
        expect(response.body.data.title).toBe(body.title);
    });

    test('[GET] /api/products', async () => {
        const response = await request(app).get('/api/products');
        const productName = response.body.data[0].title;
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.data).toBeDefined();
        expect(productName).toBeDefined();
    });

    test('[GET] /api/products/:id', async () => {
        const body = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            stock: faker.number.int({ min: 0, max: 200 })
        };
        const response = await request(app).post('/api/products/').send(body);
        const id = response.body.data._id;
        expect(id).toBeDefined();
        expect(response.statusCode).toBe(200);

        const getResponse = await request(app).get(`/api/products/${id}`);
        expect(getResponse.statusCode).toBe(200);

        const productName = response.body.data.title;
        expect(productName).toEqual(body.title);

        const idFaker = '10de7f1f3fd033f11d434acb'
        const responseGetError = await request(app).get(`/api/products/${idFaker}`);
        expect(responseGetError.statusCode).toBe(404);
        expect(responseGetError.body).toBeInstanceOf(Object);
        expect(responseGetError.body).toHaveProperty("message");
    });

    test('[PUT] /api/products/:id', async () => {
        const body = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            stock: faker.number.int({ min: 0, max: 200 })
        };
        const response = await request(app).post('/api/products/').send(body);
        const id = response.body.data._id;
        expect(id).toBeDefined();
        expect(response.statusCode).toBe(200);

        const body2 = {
            title: 'Nuevo nombre',
            description: 'Nueva descripción',
            price: 2000,
            stock: 2,
        };
        const putResponse = await request(app).put(`/api/products/${id}`).send(body2);
        expect(putResponse.statusCode).toBe(200);
        expect(putResponse.body).toBeInstanceOf(Object)
        expect(putResponse.body.status).toBeDefined()
    });

    test('[DELETE] /api/products/:id', async () => {
        const body = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            stock: faker.number.int({ min: 0, max: 200 })
        };
        const response = await request(app).post('/api/products/').send(body);
        const id = response.body.data._id;
        expect(id).toBeDefined();
        expect(response.statusCode).toBe(200);

        const deleteResponse = await request(app).delete(`/api/products/${id}`);
        expect(deleteResponse.statusCode).toBe(200);
        expect(deleteResponse.body).toBeInstanceOf(Object)
        expect(deleteResponse.body.status).toBeDefined()

        const deleteResponseError = await request(app).delete(`/api/products/${id}`);
        expect(deleteResponseError.statusCode).toBe(404);
        expect(deleteResponseError.body).toBeInstanceOf(Object);
        expect(deleteResponseError.body).toHaveProperty("message");
    });

});

describe('Test integrales para router carts', () => {
    beforeAll(async () => {
        await mongoose.connection.collections["carts"].drop();

    });

    test('[POST] /api/carts', async () => {
        const body = {
            product: '10de7f1f3fd033f11d434acb'
        };
        const response = await request(app).post('/api/carts').send(body);
        expect(response.body.data._id).toBeDefined();
        expect(response.body.data).toHaveProperty("_id");
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toHaveProperty("products");
        expect(response.body.data.products).toBeInstanceOf(Array);
    });

    test('[GET] /api/carts', async () => {
        const response = await request(app).get('/api/carts');
        const cartid = response.body.data[0]._id;
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.data).toBeDefined();
        expect(cartid).toBeDefined();
    });

    test('[GET] /api/carts/:id', async () => {
        const body = {
            product: '10de7f1f3fd033f11d434acb'
        };

        const response = await request(app).post('/api/carts/').send(body);
        const id = response.body.data._id;
        expect(id).toBeDefined();
        expect(response.statusCode).toBe(200);

        const getResponse = await request(app).get(`/api/carts/${id}`);
        expect(getResponse.statusCode).toBe(200);
        expect(getResponse.body.data).toBeInstanceOf(Object);
        expect(getResponse.body).toHaveProperty("message");
        expect(getResponse.body.data._id).toBeDefined()

        const idFaker = '10de7f1f3fd033f11d434acb'
        const responseGetError = await request(app).get(`/api/carts/${idFaker}`);
        expect(responseGetError.statusCode).toBe(404);
        expect(responseGetError.body).toBeInstanceOf(Object);
        expect(responseGetError.body).toHaveProperty("message");
    });

    test('[PUT] /api/carts/:id', async () => {
        const body = {
            product: '10de7f1f3fd033f11d434acb'
        };

        const response = await request(app).post('/api/carts/').send(body);
        const id = response.body.data._id;
        expect(id).toBeDefined();
        expect(response.statusCode).toBe(200);

        const body2 = {
            product: '10de7f1f3fd033f11d434acb'
        };
        const putResponse = await request(app).put(`/api/carts/${id}`).send(body2);
        expect(putResponse.statusCode).toBe(200);
        expect(putResponse.body).toBeInstanceOf(Object)
        expect(putResponse.body.status).toBeDefined()
    });

    test('[DELETE] /api/carts/:id', async () => {
        const body = {
            product: '10de7f1f3fd033f11d434acb'
        };
        const response = await request(app).post('/api/carts/').send(body);
        const id = response.body.data._id;
        expect(id).toBeDefined();
        expect(response.statusCode).toBe(200);

        const deleteResponse = await request(app).delete(`/api/carts/${id}`);
        expect(deleteResponse.statusCode).toBe(200);
        expect(deleteResponse.body).toBeInstanceOf(Object)
        expect(deleteResponse.body.status).toBeDefined()

        const deleteResponseError = await request(app).delete(`/api/carts/${id}`);
        expect(deleteResponseError.statusCode).toBe(404);
        expect(deleteResponseError.body).toBeInstanceOf(Object);
        expect(deleteResponseError.body).toHaveProperty("message");
    })

    test('[POST] /:idCart/products/:idProd', async () => {
        const cartBody = {
            product: '10de7f1f3fd033f11d434acb'
        };
        const productBody = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            stock: faker.number.int({ min: 0, max: 200 })
        };
        const cartResponse = await request(app).post('/api/carts/').send(cartBody);
        const productResponse = await request(app).post('/api/products/').send(productBody);
        const carttId = cartResponse.body.data._id
        const productId = productResponse.body.data._id
        const response = await request(app).post(`/api/carts/${carttId}/products/${productId}`)
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(response.body.message).toBeDefined();

        const cartIdFaker = '10de7f1f3fd033f11d434acb'
        const responseError = await request(app).post(`/api/carts/${cartIdFaker}/products/${productId}`)
        expect(responseError.body).toBeInstanceOf(Object);
        expect(responseError.statusCode).toBe(404);
        expect(responseError.body.message).toBe('Not Found');
        expect(responseError.body.error).toBeDefined();
    });

    test('[DELETE] /:idCart/products/:idProd', async () => {
        const cartBody = {
            product: '10de7f1f3fd033f11d434acb'
        };
        const productBody = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            stock: faker.number.int({ min: 0, max: 200 })
        };
        const cartResponse = await request(app).post('/api/carts/').send(cartBody);
        const productResponse = await request(app).post('/api/products/').send(productBody);
        const carttId = cartResponse.body.data._id
        const productId = productResponse.body.data._id
        const addResponse = await request(app).post(`/api/carts/${carttId}/products/${productId}`)
        expect(addResponse.statusCode).toBe(200);
        expect(addResponse.body).toHaveProperty("data");
        expect(addResponse.body.message).toBeDefined();
        const response = await request(app).delete(`/api/carts/${carttId}/products/${productId}`)
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(response.body.message).toBeDefined();

        const cartIdFaker = '10de7f1f3fd033f11d434acb'
        const productIdFaker = '10de7f1f3rd033f11d434acb'
        const cartResponseError = await request(app).delete(`/api/carts/${cartIdFaker}/products/${productId}`)
        expect(cartResponseError.body).toBeInstanceOf(Object);
        expect(cartResponseError.statusCode).toBe(404);
        expect(cartResponseError.body.message).toBe('Not Found');
        expect(cartResponseError.body.error).toBeDefined();

        const productResponseError = await request(app).delete(`/api/carts/${cartIdFaker}/products/${productIdFaker}`)
        expect(productResponseError.body).toBeInstanceOf(Object);
        expect(productResponseError.statusCode).toBe(404);
        expect(productResponseError.body.message).toBe('Not Found');
        expect(productResponseError.body.error).toBeDefined();
    });
});
