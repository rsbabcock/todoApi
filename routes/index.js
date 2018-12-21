import express from 'express';
import todoController from '../todosControllers/todos';

const router = express.Router();

// get all todos
router.post('/api/v1/todos/post', todoController.createTodo);
router.get('/api/v1/todos', todoController.getAllTodos);
router.get('/api/v1/todos/:id',todoController.getTodo);
router.delete('/api/v1/todos/:id', todoController.deleteTodo);
router.put('/api/v1/todos/:id', todoController.updateTodo);

export default router;