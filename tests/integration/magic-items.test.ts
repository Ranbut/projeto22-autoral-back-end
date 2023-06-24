import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { cleanDb, generateValidToken } from '../helpers';
import app, { init } from '@/app';
import { createMagicItems, createUser } from '../factories';

beforeAll(async () => {
    await init();
});

beforeEach(async () => {
    await cleanDb();
});

const server = supertest(app);

describe('GET /magic-items', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.get('/magic-items');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.get('/magic-items').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.get('/magic-items').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {
        it('should respond with status 200 and with magic items data', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const magicItem = await createMagicItems(user.id);

            const response = await server.get('/magic-items').set('Authorization', `Bearer ${token}`);

            expect(response.status).toEqual(httpStatus.OK);
            expect(response.body).toEqual([
                {
                    id: magicItem.id,
                    userId: magicItem.userId,
                    magicItem: magicItem.magicItem,
                    createdAt: magicItem.createdAt.toISOString(),
                    updatedAt: magicItem.updatedAt.toISOString(),
                },
            ]);
        });
    });
});

describe('GET /magic-items/:id', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.get('/magic-items/1');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.get('/magic-items/1').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.get('/magic-items/1').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {
        it('should respond with status 404 when magic item id not exist or not found', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const response = await server.get("/magic-items/1").set('Authorization', `Bearer ${token}`);

            expect(response.status).toEqual(httpStatus.NOT_FOUND);
        });

        it('should respond with status 200 and with magic item data', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const magicItem = await createMagicItems(user.id);

            const response = await server.get(`/magic-items/${magicItem.id}`).set('Authorization', `Bearer ${token}`);

            expect(response.status).toEqual(httpStatus.OK);
            expect(response.body).toEqual(
                {
                    id: magicItem.id,
                    userId: magicItem.userId,
                    magicItem: magicItem.magicItem,
                    createdAt: magicItem.createdAt.toISOString(),
                    updatedAt: magicItem.updatedAt.toISOString(),
                },
            );
        });
    });
});

describe('POST /magic-items', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.post('/magic-items');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.post('/magic-items').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.post('/magic-items').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {
        it('should respond with status 400 when is body invalid', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const response = await server.post('/magic-items').set('Authorization', `Bearer ${token}`).send({});

            expect(response.status).toEqual(httpStatus.BAD_REQUEST);
        });

        it('should respond with status 201', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const magicItemBody = {
                magicItem: {
                    name: faker.name.firstName()
                }
            };

            const response = await server.post('/magic-items').set('Authorization', `Bearer ${token}`).send(magicItemBody);

            expect(response.status).toEqual(httpStatus.CREATED);
            expect(response.body).toEqual({
                id: expect.any(Number),
                userId: expect.any(Number),
                magicItem: magicItemBody,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
              });
        });
    });
});

describe('PUT /magic-items/:id', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.put('/magic-items/1');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.put('/magic-items/1').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.put('/magic-items/1').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {
        it('should respond with status 404 when magic item id not exist or not found', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const magicItemBody = {
                magicItem: {
                    name: faker.name.firstName()
                }
            };

            const response = await server.put("/magic-items/1").set('Authorization', `Bearer ${token}`).send(magicItemBody);

            expect(response.status).toEqual(httpStatus.NOT_FOUND);
        });

        it('should respond with status 200', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const magicItem = await createMagicItems(user.id);

            const magicItemBody = {
                magicItem: {
                    name: faker.name.firstName()
                }
            };

            const response = await server.put(`/magic-items/${magicItem.id}`).set('Authorization', `Bearer ${token}`).send(magicItemBody);

            expect(response.status).toEqual(httpStatus.OK);
        });
    });
});

describe('DELETE /magic-items/:id', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.delete('/magic-items/1');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.delete('/magic-items/1').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.delete('/magic-items/1').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {
        it('should respond with status 404 when magic item id not exist or not found', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const response = await server.delete("/magic-items/1").set('Authorization', `Bearer ${token}`);

            expect(response.status).toEqual(httpStatus.NOT_FOUND);
        });

        it('should respond with status 200', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const magicItem = await createMagicItems(user.id);

            const response = await server.delete(`/magic-items/${magicItem.id}`).set('Authorization', `Bearer ${token}`);

            expect(response.status).toEqual(httpStatus.OK);
        });
    });
});