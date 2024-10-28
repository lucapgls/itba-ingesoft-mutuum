import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import faker from 'faker';
import app from '../server.js';
import { UserBuilder } from './helpers/userBuilder.js';
import { UserMother } from './helpers/userMother.js';

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


describe('User API Tests with Patterns', () => {
    // Patron AAA
    it('should create and verify user using AAA pattern', async () => {
        // Arrange
        const userData = new UserBuilder()
            .withEmail(`test_aaa_${faker.internet.email()}`)
            .withDisplayName(`AAATest_${faker.name.findName()}`)
            .build();

        // Act
        const createResponse = await request(app)
            .post('/api/v1/users/create')
            .send(userData);

        // Assert
        expect(createResponse.status).to.equal(201);
        expect(createResponse.body).to.have.property('user');
        // FIX: Ahora falla para la presentacion de TDD, podemos ponerlo en toLowerCase
        // expect(createResponse.body.user.email).to.equal(userData.email.toLowerCase());
        expect(createResponse.body.user.email).to.equal(userData.email);
    });

    // Patron Given-When-Then
    it('should handle user login process', async () => {
        // Given
        const user = UserMother.newUser();
        const createResponse = await request(app)
            .post('/api/v1/users/create')
            .send(user);

        // When
        const loginResponse = await request(app)
            .post('/api/v1/users/login')
            .send({
                email: user.email,
                password: user.password
            });

        // Then
        expect(loginResponse.status).to.equal(201);
    });

    // Patron Object Mother
    it('should create user with complete information', async () => {
        const fullUser = UserMother.userWithFullInfo();
        
        const createResponse = await request(app)
            .post('/api/v1/users/create')
            .send(fullUser);

        expect(createResponse.status).to.equal(201);
        expect(createResponse.body).to.have.property('user');
    });

    // 5. Patron Fixture Setup
    describe('User Profile Operations', () => {
        let testUser;
        let userId;

        // Fixture Setup
        beforeEach(async () => {
            testUser = UserMother.newUser();
            const createResponse = await request(app)
                .post('/api/v1/users/create')
                .send(testUser);
            
            userId = createResponse.body.user.user_id;
        });

        // Ejemplo de test adicional usando el mismo fixture
        it('should allow user to login after creation', async () => {
            const loginResponse = await request(app)
                .post('/api/v1/users/login')
                .send({
                    email: testUser.email,
                    password: testUser.password
                });

            expect(loginResponse.status).to.equal(201);
        });
    });
});