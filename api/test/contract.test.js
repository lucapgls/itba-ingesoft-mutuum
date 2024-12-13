import request from 'supertest';
import { expect } from 'chai';
import { describe } from 'mocha';

import app from '../server.js';

const myLenderWalletId = '8855cb91-e040-518b-920f-5220557fb2f9'
const myBorrowerWalletId = '201a17b5-d10a-5181-9f46-94b9b1a4fc52'

describe('Contract API Tests', () => {

    let contractAddress; // Variable para almacenar el contractAddress

    it('should create a new loan contract', (done) => {
        request(app)
            .post('/api/v1/contracts/create')
            .send({
                lenderWalletId: myLenderWalletId,
                loanAmount: 1000,
                interest: 5,
                deadline: 86400,
            })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('contractAddress');
                contractAddress = res.body.contractAddress; 
                done();
            });
    });

    it('should take a loan from a contract', (done) => {
        request(app)
            .post('/api/v1/contracts/create')
            .send({
                contractAddress: contractAddress, 
                borrowerWalletId: myBorrowerWalletId,
            })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message', 'Loan taken successfully');
                done();
            });
    });
});
