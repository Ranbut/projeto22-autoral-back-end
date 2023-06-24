import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { cleanDb, generateValidToken } from '../helpers';
import app, { init } from '@/app';
import { createSpell, createUser } from '../factories';

beforeAll(async () => {
    await init();
});

beforeEach(async () => {
    await cleanDb();
});

const server = supertest(app);

describe('GET /spells', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.get('/spells');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.get('/spells').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.get('/spells').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {
        it('should respond with status 200 and with spells data', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const spell = await createSpell(user.id);

            const response = await server.get('/spells').set('Authorization', `Bearer ${token}`);

            expect(response.status).toEqual(httpStatus.OK);
            expect(response.body).toEqual([
                {
                    id: spell.id,
                    userId: spell.userId,
                    spell: spell.spell,
                    createdAt: spell.createdAt.toISOString(),
                    updatedAt: spell.updatedAt.toISOString(),
                },
            ]);
        });
    });
});

describe('GET /spells/:id', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.get('/spells/1');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.get('/spells/1').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.get('/spells/1').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {
        it('should respond with status 404 when spell id not exist or not found', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const response = await server.get("/spells/1").set('Authorization', `Bearer ${token}`);

            expect(response.status).toEqual(httpStatus.NOT_FOUND);
        });

        it('should respond with status 200 and with spell data', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const spell = await createSpell(user.id);

            const response = await server.get(`/spells/${spell.id}`).set('Authorization', `Bearer ${token}`);

            expect(response.status).toEqual(httpStatus.OK);
            expect(response.body).toEqual(
                {
                    id: spell.id,
                    userId: spell.userId,
                    spell: spell.spell,
                    createdAt: spell.createdAt.toISOString(),
                    updatedAt: spell.updatedAt.toISOString(),
                },
            );
        });
    });
});

describe('POST /spells', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.post('/spells');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.post('/spells').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.post('/spells').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {
        it('should respond with status 400 when is body invalid', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const response = await server.post('/spells').set('Authorization', `Bearer ${token}`).send({});

            expect(response.status).toEqual(httpStatus.BAD_REQUEST);
        });

        it('should respond with status 201', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const spellBody = {
                spell: {
                    name: faker.name.firstName()
                }
            };

            const response = await server.post('/spells').set('Authorization', `Bearer ${token}`).send(spellBody);

            expect(response.status).toEqual(httpStatus.CREATED);
            expect(response.body).toEqual({
                id: expect.any(Number),
                userId: expect.any(Number),
                spell: spellBody,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
              });
        });
    });
});

describe('PUT /spells/:id', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.put('/spells/1');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.put('/spells/1').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.put('/spells/1').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {
        it('should respond with status 404 when spell id not exist or not found', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const spellBody = {
                spell: {
                    name: faker.name.firstName()
                }
            };

            const response = await server.put("/spells/1").set('Authorization', `Bearer ${token}`).send(spellBody);

            expect(response.status).toEqual(httpStatus.NOT_FOUND);
        });

        it('should respond with status 200', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const spell = await createSpell(user.id);

            const spellBody = {
                spell: {
                    name: faker.name.firstName()
                }
            };

            const response = await server.put(`/spells/${spell.id}`).set('Authorization', `Bearer ${token}`).send(spellBody);

            expect(response.status).toEqual(httpStatus.OK);
        });
    });
});

describe('DELETE /spells/:id', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.delete('/spells/1');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.delete('/spells/1').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.delete('/spells/1').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {
        it('should respond with status 404 when spell id not exist or not found', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const response = await server.delete("/spells/1").set('Authorization', `Bearer ${token}`);

            expect(response.status).toEqual(httpStatus.NOT_FOUND);
        });

        it('should respond with status 200', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const spell = await createSpell(user.id);

            const response = await server.delete(`/spells/${spell.id}`).set('Authorization', `Bearer ${token}`);

            expect(response.status).toEqual(httpStatus.OK);
        });
    });
});