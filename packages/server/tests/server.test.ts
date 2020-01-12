import tape from 'tape';
import request from 'supertest';
import {clean, prepare} from "./utils";

const PATH = __dirname + '/store';
process.env.STORE = PATH;

let router;

import routerFactory from '../src/router';

tape('setup', async ({end}) => {
    clean(PATH);
    prepare(PATH);

    router = await routerFactory();

    end();
});

tape(`GET /health`, ({plan, same, end, error}) => {
    const response = {'ok': true};

    request(router)
        .get(`/health`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, {body}) => {
            same(body, response);
            error(err, 'No error');

            end();
        })
    ;

    plan(2);
});

tape(`POST /upload; should return 201`, ({plan, end, error}) => {
    request(router)
        .post(`/upload`)
        .attach('file', __dirname + '/assets/foobar#v1.1.1.zip')
        .expect(201)
        .end((err) => {
            error(err, 'No error');
            end();
        })
    ;

    plan(1);
});

tape(`POST /upload; should return 409`, ({plan, end, error}) => {
    request(router)
        .post(`/upload`)
        .attach('file', __dirname + '/assets/foobar#v1.1.1.zip')
        .expect(409)
        .end((err) => {
            error(err, 'No error');
            end();
        })
    ;

    plan(1);
});

tape(`PUT /upload; should return 200`, ({plan, end, error}) => {
    request(router)
        .put(`/upload`)
        .attach('file', __dirname + '/assets/foobar#v1.1.1.zip')
        .expect(200)
        .end((err) => {
            error(err, 'No error');
            end();
        })
    ;

    plan(1);
});
