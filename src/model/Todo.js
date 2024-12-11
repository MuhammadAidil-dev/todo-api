const { default: mongoose } = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    todo: {
      type: String,
      required: true,
    },
    isChecked: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: new Date().toISOString(),
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
