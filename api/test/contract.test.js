import request from 'supertest';
import { expect } from 'chai';
import { describe } from 'mocha';

import app from '../server.js';

const myLenderWalletId = '8855cb91-e040-518b-920f-5220557fb2f9'; // TODO: Usar wallets que existan
const myBorrowerWalletId = '201a17b5-d10a-5181-9f46-94b9b1a4fc52'; 

const existingContractAddress = '0xC450a43092785FfF6d62130E1Dc0CB6C60A77B93';

describe('Contract API Tests', () => {
    it('should initialize an existing loan contract', (done) => {
        request(app)
            .post('/api/v1/contracts/initialize')
            .send({
                lenderWalletId: myLenderWalletId,
                contractAddress: existingContractAddress,
                loanAmount: 5,
            })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message', 'Contract initialized successfully');
                done();
            });
    });

    it('should take a loan from the initialized contract', (done) => {
        request(app)
            .post('/api/v1/contracts/take')
            .send({
                contractAddress: existingContractAddress,
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
