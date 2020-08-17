const request = require('supertest');
const app = require('../index');

describe('API', () => {

    let sessionId = null;
    let url = '/api/v1/sessions';

    it('Session Create', async () => {
        const res = await request(app).post(url).send({});

        expect(res.body).toEqual(
            expect.objectContaining({
                code: 201,
                status: 'success',
                message: expect.any(String),
                data: expect.objectContaining({
                    id: 1,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                })
            })
        );
        sessionId = res.body.data.id
    });

    it('Session Read', async () => {
        const res = await request(app).get(url + '/' + sessionId).send({});

        expect(res.body).toEqual(
            expect.objectContaining({
                code: 200,
                status: 'success',
                message: expect.any(String),
                data: expect.objectContaining({
                    id: 1,
                    isActive: true,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                })
            })
        );
    });

    it('Session Update', async () => {
        const res = await request(app).post(url + '/' + sessionId).send({
            isActive: false
        });

        expect(res.body).toEqual(
            expect.objectContaining({
                code: 200,
                status: 'success',
                message: expect.any(String),
                data: expect.objectContaining({
                    id: 1,
                    isActive: false,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                })
            })
        );
    });

    it('Session Re-Read After Update', async () => {
        const res = await request(app).get(url + '/' + sessionId).send({});

        expect(res.body).toEqual(
            expect.objectContaining({
                code: 200,
                status: 'success',
                message: expect.any(String),
                data: expect.objectContaining({
                    id: 1,
                    isActive: false,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                })
            })
        );
    });

    it('Session List', async () => {
        const res = await request(app).get(url).send({});

        expect(res.body).toEqual(
            expect.objectContaining({
                code: 200,
                status: 'success',
                message: expect.any(String),
                data: expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        isActive: expect.any(Boolean),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                    })
                ])
            })
        );
    });

    let messageUrl = '/api/v1/messages';

    it('Message Create', async () => {
        const resSession = await request(app).post(url).send({});
        const res = await request(app).post(messageUrl).send({
            sessionId: resSession.body.data.id,
            message: "New york weather."
        });

        expect(res.body).toEqual(
            expect.objectContaining({
                code: 201,
                status: 'success',
                message: expect.any(String),
                data: expect.objectContaining({
                    id: expect.any(Number),
                    sessionId: expect.any(Number),
                    author: expect.any(String),
                    message: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                })
            })
        );
    });

    it('Message List', async () => {
        const res = await request(app).get(messageUrl).send({});

        expect(res.body).toEqual(
            expect.objectContaining({
                code: 200,
                status: 'success',
                message: expect.any(String),
                data: expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        sessionId: expect.any(Number),
                        author: expect.any(String),
                        message: expect.any(String),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                    })
                ])
            })
        );
    });

})
