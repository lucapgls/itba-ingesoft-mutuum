import request from 'supertest';
import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import faker from 'faker';
import app from '../../server.js';

// testHelpers/userBuilder.js
export class UserBuilder {
    constructor() {
        this.user = {
            email: `testing_${faker.internet.email()}`,
            password: '!MutuumFTW2024',
            display_name: faker.name.findName(),
        };
    }

    withEmail(email) {
        this.user.email = email;
        return this;
    }

    withDisplayName(name) {
        this.user.display_name = name;
        return this;
    }

    withDNI(dni) {
        this.user.dni = dni;
        return this;
    }

    withPhoneNumber(phone) {
        this.user.phone_number = phone;
        return this;
    }

    build() {
        return {...this.user};
    }
}