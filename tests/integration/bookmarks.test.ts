import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { cleanDb, generateValidToken } from '../helpers';
import app, { init } from '@/app';
import { createBookmark, createUser } from '../factories';

beforeAll(async () => {
    await init();
});

beforeEach(async () => {
    await cleanDb();
});

const server = supertest(app);

describe('GET /bookmarks', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.get('/bookmarks');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.get('/bookmarks').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.get('/bookmarks').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {
        it('should respond with status 200 and with bookmarks data', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const bookmark = await createBookmark(user.id);

            const response = await server.get('/bookmarks').set('Authorization', `Bearer ${token}`);

            expect(response.status).toEqual(httpStatus.OK);
            expect(response.body).toEqual([
                {
                    id: bookmark.id,
                    userId: bookmark.userId,
                    index: bookmark.index,
                    name: bookmark.name,
                    type: bookmark.type,
                    createdAt: bookmark.createdAt.toISOString(),
                    updatedAt: bookmark.updatedAt.toISOString(),
                },
            ]);
        });
    });
});

describe('GET /bookmarks/:index', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.get('/bookmarks/index');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.get('/bookmarks/index').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.get('/bookmarks/index').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {
        it('should respond with status 200 and with bookmarks data', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const bookmark = await createBookmark(user.id);

            const response = await server.get(`/bookmarks/${bookmark.index}`).set('Authorization', `Bearer ${token}`);

            expect(response.status).toEqual(httpStatus.OK);
            expect(response.body).toEqual(
                {
                    id: bookmark.id,
                    userId: bookmark.userId,
                    index: bookmark.index,
                    name: bookmark.name,
                    type: bookmark.type,
                    createdAt: bookmark.createdAt.toISOString(),
                    updatedAt: bookmark.updatedAt.toISOString(),
                },
            );
        });
    });
});

describe('POST /bookmarks', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.post('/bookmarks');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.post('/bookmarks').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.post('/bookmarks').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {
        it('should respond with status 400 when is body invalid', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const response = await server.post('/bookmarks').set('Authorization', `Bearer ${token}`).send({});

            expect(response.status).toEqual(httpStatus.BAD_REQUEST);
        });

        it('should respond with status 409 when already bookmarked', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            await createBookmark(user.id, "Adult Black Dragon", "MONSTER");

            const bookmarkBody = {
                index: "adult black dragon",
                name: "Adult Black Dragon",
                type: "MONSTER"
            };

            const response = await server.post('/bookmarks').set('Authorization', `Bearer ${token}`).send(bookmarkBody);

            expect(response.status).toEqual(httpStatus.CONFLICT);
        });

        it('should respond with status 201', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const bookmarkBody = {
                index: "adult-black-dragon",
                name: "Adult Black Dragon",
                type: "MONSTER"
            };

            const response = await server.post('/bookmarks').set('Authorization', `Bearer ${token}`).send(bookmarkBody);

            expect(response.status).toEqual(httpStatus.CREATED);
        });
    });
});