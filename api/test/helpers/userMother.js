import faker from 'faker';

export class UserMother {
    static newUser() {
        return {
            email: `testing_${faker.internet.email()}`,
            password: '!MutuumFTW2024',
            display_name: faker.name.findName()
        };
    }

    static userWithFullInfo() {
        return {
            email: `testing_${faker.internet.email()}`,
            password: '!MutuumFTW2024',
            display_name: faker.name.findName(),
            dni: '12345678',
            phone_number: '23456781'
        };
    }
}