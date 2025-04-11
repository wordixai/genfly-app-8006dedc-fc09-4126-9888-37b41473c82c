import React from 'react';
import AddTodo from '@/components/AddTodo';
import TodoList from '@/components/TodoList';
import { Button } from '@/components/ui/button';
import { useTodos } from '@/hooks/useTodos';

const Index = () => {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos();
  
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8">Todo App</h1>
        
        <AddTodo onAdd={addTodo} />
        
        <TodoList 
          todos={todos} 
          onToggle={toggleTodo} 
          onDelete={deleteTodo} 
        />
        
        {totalCount > 0 && (
          <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
            <div>
              {completedCount} of {totalCount} completed
            </div>
            {completedCount > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearCompleted}
                className="text-xs"
              >
                Clear completed
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;