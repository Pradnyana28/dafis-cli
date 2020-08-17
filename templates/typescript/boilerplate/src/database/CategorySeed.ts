import faker from 'faker';

import CategorySchema from '../app/Models/Category/Category.Schema';

export default async () => {
    try {
        let data = [];
        for (let i = 0; i < 4; i += 1) {
            let newData = {
                name: faker.random.word(),
                featured: faker.random.boolean(),
                content: faker.random.word()
            };
            data.push(newData);
        
            // visual feedback always feels nice!
            console.log(newData.name);
        }
        await CategorySchema.insertMany(data);
        console.log('Categories seeded!');
    } catch (err) {
        console.error(err);
    }
}