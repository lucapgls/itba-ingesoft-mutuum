import request from 'supertest';
import { expect } from 'chai';
import { describe } from 'mocha';
import faker from 'faker';
import app from '../server.js';

describe('User API Tests', () => {
    it('should create a new user, if it doesnt exist', (done) => {
        const randomEmail = "testing_" + faker.internet.email();
        request(app)
            .post('/api/v1/user/create')
            .send(
                { 
                    'email': randomEmail, 
                    'password': '!MutuumFTW2024' 
                }
            )
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('user');
                done();
            });
    });


});