import request from 'supertest';
import { expect } from 'chai';
import { describe } from 'mocha';

import app from '../server.js';

// const myLenderWalletId = '627a6145-e25a-5820-9787-cda00baf3757'; // Harcodeadas
// const myBorrowerWalletId = '7e16d0fb-9981-5a25-a0e3-dcf9d778f579'; 

// const existingContractAddress = '0xC450a43092785FfF6d62130E1Dc0CB6C60A77B93';

describe('Contract API Tests', () => {
    it('should deploy a contract', (done) => {
        request(app)
            .post('/api/v1/contracts/deploy')
            .send({
                loanAmount: 5,
                interest: 5,
                deadline: 86000
            })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message', 'Contract initialized successfully');
                done();
            });
    });
});
