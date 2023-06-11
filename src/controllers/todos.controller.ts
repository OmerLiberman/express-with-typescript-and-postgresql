import {RequestHandler} from 'express';

import { Todo } from '../models/todos.model';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
    const text = (req.body as {text: string}).text;
    const newTodo = new Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({message: 'Todo was created!', createTodo: newTodo});
};

export const getTodos: RequestHandler = (req, res, next) => {
    res.status(200).json({todos: TODOS});
};

export const updateTodos: RequestHandler<{id: string}> = (req, res, next) => {
    const todoId = req.params.id;
    const newText = (req.body as {text: string}).text;

    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Couldnt find todo');
    }
    
    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, newText);
    
    res.status(200).json({message: 'Updated!', newTodo: TODOS[todoIndex]});
};

export const deleteTodos: RequestHandler<{id: string}> = (req, res, next) => {
    const todoId = req.params.id;

    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Couldnt find todo');
    }
    
    TODOS.splice(todoIndex, 1);


    res.status(204).json({message: 'Deleted!'});
};