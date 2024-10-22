import request from 'supertest';
import { expect } from 'chai';
import { describe } from 'mocha';

import app from '../server.js';

describe('Lending Post API Tests', () => {
    it('should return active lending posts', (done) => {
        request(app)
            .get('/api/v1/lendingPost?active=true')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(200);
                done();
            });
    });
});