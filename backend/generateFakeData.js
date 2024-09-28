import mongoose from "mongoose";
import { faker } from '@faker-js/faker';
import fs  from "fs";
import { Book } from "../models/bookModel.js";


mongoose.connect(mongoURL)
.then(() => {
    console.log(`MongoDB Connected at ${mongoURL}`);
}).catch((err) => {
    console.log(`MongoDB Connection Error: ${err.message}`);
})

const generateFakeData = (count) => {
  const fakeData = [];
  for (let i = 0; i < count; i++) {
    fakeData.push({
      title: faker.lorem.words(2),
      author: faker.person.fullName(),
      publishYear: faker.number.int({ min: 1800, max: 2023 }),
    });
  }
  return fakeData;
};

const insertFakeData = async (count) => {
  const fakeData = generateFakeData(count);
  await Book.insertMany(fakeData);
  console.log('Fake data inserted into MongoDB.');
};

const exportDataToJson = async () => {
  const books = await Book.find({}); 
  const jsonOutput = JSON.stringify(books, null, 2);

  fs.writeFile('bookData.json', jsonOutput, (err) => {
    if (err) {
      console.error('Error exporting data to JSON file:', err);
    } else {
      console.log('Data exported to bookData.json');
    }
  });
};

const count = 10; 
insertFakeData(count)
  .then(() => exportDataToJson())
  .catch((err) => console.error(err));


