const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {})
  .then(() => {
    // console.log(con.connection);
    // console.log('DB connection successful!');
  })
  .catch((err) => console.log('DB connection error:', err));

//READ FILE JSON
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//import data into db
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
    // process.exit();
  } catch (error) {
    console.log(error);
  }
  process.exit();
};
//delete all data from db
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
    // process.exit();
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

console.log(process.argv);
if (process.argv[2] === '---import') {
  importData();
} else if (process.argv[2] === '---delete') {
  deleteData();
}
