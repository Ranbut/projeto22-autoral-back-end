import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { cleanDb, generateValidToken } from '../helpers';
import app, { init } from '@/app';
import { createHistory, createUser } from '../factories';

beforeAll(async () => {
    await init();
});

beforeEach(async () => {
    await cleanDb();
});

const server = supertest(app);

describe('GET /history', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.get('/history');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.get('/history').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.get('/history').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {
        it('should respond with status 200 and with history data', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const history = await createHistory(user.id);

            const response = await server.get('/history').set('Authorization', `Bearer ${token}`);

            expect(response.status).toEqual(httpStatus.OK);
            expect(response.body).toEqual([
                {
                    id: history.id,
                    userId: history.userId,
                    index: history.index,
                    name: history.name,
                    type: history.type,
                    createdAt: history.createdAt.toISOString(),
                    updatedAt: history.updatedAt.toISOString(),
                },
            ]);
        });
    });
});

describe('POST /history', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.post('/history');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.post('/history').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.post('/history').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {
        it('should respond with status 400 when is body invalid', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const response = await server.post('/history').set('Authorization', `Bearer ${token}`).send({});

            expect(response.status).toEqual(httpStatus.BAD_REQUEST);
        });

        it('should respond with status 201', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const historyBody = {
                index: "adult-black-dragon",
                name: "Adult Black Dragon",
                type: "MONSTER"
            };

            const response = await server.post('/history').set('Authorization', `Bearer ${token}`).send(historyBody);

            expect(response.status).toEqual(httpStatus.CREATED);
        });
    });
});

describe('DELETE /history/:id', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.delete('/history');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.delete('/history').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.delete('/history').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {
        it('should respond with status 200', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            await createHistory(user.id);
            await createHistory(user.id);
            await createHistory(user.id);

            const response = await server.delete(`/history`).set('Authorization', `Bearer ${token}`);

            expect(response.status).toEqual(httpStatus.OK);
        });
    });
});