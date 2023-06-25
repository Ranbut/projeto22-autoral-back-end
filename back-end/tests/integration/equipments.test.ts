import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { cleanDb, generateValidToken } from '../helpers';
import app, { init } from '@/app';
import { createEquipment, createUser } from '../factories';

beforeAll(async () => {
    await init();
});

beforeEach(async () => {
    await cleanDb();
});

const server = supertest(app);

describe('GET /equipments', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.get('/equipments');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.get('/equipments').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.get('/equipments').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {
        it('should respond with status 200 and with equipments data', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const equipment = await createEquipment(user.id);

            const response = await server.get('/equipments').set('Authorization', `Bearer ${token}`);

            expect(response.status).toEqual(httpStatus.OK);
            expect(response.body).toEqual([
                {
                    id: equipment.id,
                    userId: equipment.userId,
                    equipment: equipment.equipment,
                    createdAt: equipment.createdAt.toISOString(),
                    updatedAt: equipment.updatedAt.toISOString(),
                },
            ]);
        });
    });
});

describe('GET /equipments/:id', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.get('/equipments/1');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.get('/equipments/1').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.get('/equipments/1').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {
        it('should respond with status 404 when equipments id not exist or not found', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const response = await server.get("/equipments/1").set('Authorization', `Bearer ${token}`);

            expect(response.status).toEqual(httpStatus.NOT_FOUND);
        });

        it('should respond with status 200 and with equipments data', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const equipment = await createEquipment(user.id);

            const response = await server.get(`/equipments/${equipment.id}`).set('Authorization', `Bearer ${token}`);

            expect(response.status).toEqual(httpStatus.OK);
            expect(response.body).toEqual(
                {
                    id: equipment.id,
                    userId: equipment.userId,
                    equipment: equipment.equipment,
                    createdAt: equipment.createdAt.toISOString(),
                    updatedAt: equipment.updatedAt.toISOString(),
                },
            );
        });
    });
});

describe('POST /equipments', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.post('/equipments');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.post('/equipments').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.post('/equipments').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {
        it('should respond with status 400 when is body invalid', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const response = await server.post('/equipments').set('Authorization', `Bearer ${token}`).send({});

            expect(response.status).toEqual(httpStatus.BAD_REQUEST);
        });

        it('should respond with status 201', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const equipmentBody = {
                index: "club",
                name: "Club",
                cost: { quantity: 1, unit: "sp" },
                weight: 2,
                equipment_category: { name: "Weapon" }
            };

            const response = await server.post('/equipments').set('Authorization', `Bearer ${token}`).send(equipmentBody);

            expect(response.status).toEqual(httpStatus.CREATED);
            expect(response.body).toEqual({
                id: expect.any(Number),
                userId: expect.any(Number),
                equipment: equipmentBody,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
              });
        });
    });
});

describe('PUT /equipments/:id', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.put('/equipments/1');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.put('/equipments/1').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.put('/equipments/1').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {
        it('should respond with status 404 when equipment id not exist or not found', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const equipmentBody = {
                index: "club",
                name: "Club",
                cost: { quantity: 1, unit: "sp" },
                weight: 2,
                equipment_category: { name: "Weapon" }
            };

            const response = await server.put("/equipments/1").set('Authorization', `Bearer ${token}`).send(equipmentBody);

            expect(response.status).toEqual(httpStatus.NOT_FOUND);
        });

        it('should respond with status 200', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const equipment = await createEquipment(user.id);

            const equipmentBody = {
                index: "club",
                name: "Club",
                cost: { quantity: 1, unit: "sp" },
                weight: 2,
                equipment_category: { name: "Weapon" }
            };

            const response = await server.put(`/equipments/${equipment.id}`).set('Authorization', `Bearer ${token}`).send(equipmentBody);

            expect(response.status).toEqual(httpStatus.OK);
        });
    });
});

describe('DELETE /equipments/:id', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.delete('/equipments/1');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.delete('/equipments/1').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.delete('/equipments/1').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {
        it('should respond with status 404 when equipment id not exist or not found', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const response = await server.delete("/equipments/1").set('Authorization', `Bearer ${token}`);

            expect(response.status).toEqual(httpStatus.NOT_FOUND);
        });

        it('should respond with status 200', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const equipment = await createEquipment(user.id);

            const response = await server.delete(`/equipments/${equipment.id}`).set('Authorization', `Bearer ${token}`);

            expect(response.status).toEqual(httpStatus.OK);
        });
    });
});