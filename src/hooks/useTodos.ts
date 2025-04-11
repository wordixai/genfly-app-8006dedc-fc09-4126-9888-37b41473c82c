import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from '@/types/todo';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        // Parse the JSON and convert string dates back to Date objects
        return JSON.parse(savedTodos, (key, value) => 
          key === 'createdAt' ? new Date(value) : value
        );
      } catch (e) {
        console.error('Failed to parse todos from localStorage', e);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    // Convert Date objects to strings for storage
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        text,
        completed: false,
        createdAt: new Date(),
      },
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
  };
}