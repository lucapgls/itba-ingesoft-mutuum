import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import faker from 'faker';
import app from '../server.js';

describe('User API Tests', () => {
    let randomEmail = "testing_" + faker.internet.email();

    it('should create a new user, if it doesnt exist', (done) => {
        // Increase timeout for supabase to respond
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
    }).timeout(5000);

    it('should login a user, if it exists', (done) => {
        request(app)
            .post('/api/v1/user/login')
            .send(
                { 
                    'email': randomEmail,
                    'password': '!MutuumFTW2024'
                }
            )
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(201);
                // expect(res.body).to.have.property('user');
                done();
            });
    });

});