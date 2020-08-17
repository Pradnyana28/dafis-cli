import faker from 'faker';

import BlogSchema from '../app/Models/Blogs/Blog.Schema';

export default async () => {
    try {
        let data = [];
        for (let i = 0; i < 4; i += 1) {
            let newData = {
                writerId: "5ec525588f25e509e10b6d83",
                title: faker.random.words(),
                description: faker.lorem.paragraphs(),
                applause: 0,
                comment: 0,
                options: {
                    seo: {
                        metaTitle: faker.random.word,
                        metaDescription: faker.lorem.words(),
                        metaImage: faker.random.image()
                    }
                },
                thumbnail: faker.random.image()
            };
            data.push(newData);
        
            // visual feedback always feels nice!
            console.log(newData.title);
        }
        await BlogSchema.insertMany(data);
        console.log('Blogs seeded!');
    } catch (err) {
        console.error(err);
    }
}