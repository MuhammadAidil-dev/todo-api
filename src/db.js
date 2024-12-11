const { default: mongoose } = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://nbggaming0:todo_app_database@tododb.hhqnx.mongodb.net/todoApp?retryWrites=true&w=majority&appName=tododb'
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
