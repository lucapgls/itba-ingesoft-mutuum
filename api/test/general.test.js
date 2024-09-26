import request from 'supertest';
import { expect } from 'chai';
import { describe } from 'mocha';

import app from '../server.js';

describe('General API Tests', () => {
    it('should return API is running', (done) => {
        request(app)
            .get('/api/health')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(200);
                expect(res.text).to.equal('API is running');
                done();
            });
    });
});