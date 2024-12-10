import request from 'supertest';
import { expect } from 'chai';
import { describe } from 'mocha';

import app from '../server.js';

describe('Contract API Tests', () => {
    it('should create a new loan contract', (done) => {
        request(app)
            .post('/api/contracts/create')
            .send({
                lenderWalletId: '1234',
                loanAmount: 1000,
                interest: 5,
                deadline: 86400,
            })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('contractAddress');
                done();
            });
    });

    it('should take a loan from a contract', (done) => {
        request(app)
            .post('/api/contracts/take')
            .send({
                contractAddress: '0xContractAddress',
                borrowerWalletId: '5678',
            })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message', 'Loan taken successfully');
                done();
            });
    });
});
