const Todo = require('../model/Todo');
const fs = require('fs');
const path = require('path');

const deleteFileMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);
    if (!todo) {
      console.log('todo not exist');
      return res.status(404).json({ message: 'Task not found' });
    }

    const filePath = path.join(__dirname, '../../', todo.taskImage);
    // hapus jika file berubah atau ketika task di delete
    if (req.file || req.method === 'DELETE') {
      if (fs.existsSync(filePath)) {
        console.log('file exist');
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file', err);
          } else {
            console.log('File deleted');
          }
        });
      } else {
        console.log('file not exist');
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = deleteFileMiddleware;
