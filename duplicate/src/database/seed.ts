import mongoDB from 'mongodb';
import dotenv from 'dotenv';
import faker from 'faker';
import bcrypt from 'bcryptjs';

// import UserModel from './../app/Models/User';

class Seeder {
    private mongo;
    private db_uri: string;

    constructor() {
        dotenv.config();
        this.mongo = mongoDB.MongoClient;
        this.db_uri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`;
    }

    public async seed() {
        try {
            const client = await this.mongo.connect(this.db_uri, { useUnifiedTopology: true });
            const db = client.db(process.env.DB_NAME);

            const usersCollection = db.collection('users');
            await this.user(usersCollection);

            client.close();
        } catch (err) {
            console.trace(err);
        }
    }

    public async user(collections) {
        try {
            let users = [];
            for (let i = 0; i < 10; i += 1) {
                const firstName = faker.name.firstName();
                const lastName = faker.name.lastName();
                let newUser = {
                    email: faker.internet.email(firstName, lastName),
                    firstName,
                    lastName,
                    password: bcrypt.hashSync('Password', process.env.SYSTEM_SALT),
                    emailVerified: true,
                    address: faker.address.streetName(),
                    address2: faker.address.secondaryAddress(),
                    city: { id: 'ighIGs6desgdAsdskdads', name: faker.address.city() },
                    province: { id: 'ighIGs6desgdAsdskdads', name: faker.address.state() },
                };
                users.push(newUser);
            
                // visual feedback always feels nice!
                console.log(newUser.email);
            }
            await collections.insertMany(users);
            console.log('Users seeded!');
        } catch (err) {
            console.error(err);
        }
    }

}

export default new Seeder().seed();