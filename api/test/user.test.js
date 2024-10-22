import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import faker from 'faker';
import app from '../server.js';

describe('User API Tests', () => {
    let randomEmail = "testing_" + faker.internet.email();
    let display_name = faker.name.findName();
    it('should create a new user, if it doesnt exist', (done) => {
        // Increase timeout for supabase to respond
        request(app)
            .post('/api/v1/users/create')
            .send(
                { 
                    'email': randomEmail, 
                    'password': '!MutuumFTW2024',
                    'display_name': display_name,
                }
            )
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('user');
                done();
            });
    });

    it('should login a user, if it exists', (done) => {
        request(app)
            .post('/api/v1/users/login')
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

  

    let user_id = "2704ea76-34a5-4eb8-822e-22cd520734ec";
    
    it('should edit profile info', (done) => {
        request(app)
            .put('/api/v1/users/updateInfo')
            .send(
                { 
                    'user_id': user_id,
                    'display_name': display_name,
                    'dni': '12345678',
                    'phone_number': '23456781',
                    
                }
            )
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(200);
                done();
            });
    })

});

