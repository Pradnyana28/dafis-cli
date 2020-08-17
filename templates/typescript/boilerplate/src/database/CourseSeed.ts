import faker from 'faker';

import CourseSchema from '../app/Models/Course/Course.Schema';

export default async () => {
    try {
        let data = [];
        for (let i = 0; i < 4; i += 1) {
            let newData = {
                instructorId: "5ec525588f25e509e10b6d83",
                categoryId: "5ecfb236d6f1fc7163d1dac4",
                name: faker.random.words(),
                description: faker.random.words(),
                subheading: faker.random.words(),
                language: 'en-US',
                lectures: faker.random.number(),
                duration: faker.random.number(),
                thumbnail: faker.random.image()
            };
            data.push(newData);
        
            // visual feedback always feels nice!
            console.log(newData.name);
        }
        await CourseSchema.insertMany(data);
        console.log('Course seeded!');
    } catch (err) {
        console.error(err);
    }
}