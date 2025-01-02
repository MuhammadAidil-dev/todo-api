const { default: mongoose } = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    taskTitle: {
      type: String,
      required: true,
    },
    taskDescription: {
      type: String,
    },
    taskPriority: {
      type: String,
      required: true,
      enum: ['high', 'medium', 'low'],
      default: 'low',
    },
    taskImage: {
      type: String,
    },
    taskStatus: {
      type: String,
      enum: ['completed', 'in progres', 'not started'],
      default: 'not started',
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
