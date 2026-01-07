````markdown
---
name: zustand-store
description: Zustand state management for React applications with TypeScript. Use for creating stores, managing global state, persistence, and computed values. Triggers on requests for state management, global state, stores, Zustand patterns, or data persistence with localStorage.
---

# Zustand Store Patterns

## Store Structure

```
src/store/
├── todoStore.ts       # Domain-specific store
├── uiStore.ts         # UI state (modals, sidebars, etc.)
├── index.ts           # Barrel exports
```

## Basic Store Pattern

```tsx
// store/todoStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';

// Entity Type
interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

// State Interface
interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

// Actions Interface
interface TodoActions {
  addTodo: (title: string) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  setFilter: (filter: TodoState['filter']) => void;
}

// Combined Store Type
type TodoStore = TodoState & TodoActions;

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      // Initial State
      todos: [],
      filter: 'all',

      // Actions
      addTodo: (title) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: nanoid(),
              title,
              completed: false,
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      updateTodo: (id, updates) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, ...updates } : todo
          ),
        })),

      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),

      setFilter: (filter) => set({ filter }),
    }),
    {
      name: 'todo-storage', // localStorage key
    }
  )
);
```

## Selectors Pattern

```tsx
// Inline selectors for performance
const todos = useTodoStore((state) => state.todos);
const addTodo = useTodoStore((state) => state.addTodo);

// Computed/derived selectors
const useFilteredTodos = () => {
  const todos = useTodoStore((state) => state.todos);
  const filter = useTodoStore((state) => state.filter);
  
  return useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.completed);
      case 'completed':
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);
};

// Reusable selector functions
const selectTodoById = (id: string) => (state: TodoStore) =>
  state.todos.find((todo) => todo.id === id);

// Usage
const todo = useTodoStore(selectTodoById('abc123'));
```

## Usage in Components

```tsx
// organisms/TodoList/TodoList.tsx
import styles from './TodoList.module.css';
import { useTodoStore } from '../../store';

export const TodoList: FC = () => {
  const todos = useTodoStore((state) => state.todos);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  if (todos.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => toggleTodo(todo.id)}
          onDelete={() => deleteTodo(todo.id)}
        />
      ))}
    </ul>
  );
};
```

## Store Organization

| Store Type | Purpose | Examples |
|------------|---------|----------|
| Domain Store | Business entities | `todoStore`, `userStore`, `projectStore` |
| UI Store | UI-only state | `modalStore`, `sidebarStore`, `themeStore` |

## Naming Conventions

- **Store file:** `[domain]Store.ts` (camelCase)
- **Hook:** `use[Domain]Store` (e.g., `useTodoStore`)
- **State interface:** `[Domain]State`
- **Actions interface:** `[Domain]Actions`
- **localStorage key:** `[domain]-storage` (kebab-case)

## Barrel Export

```tsx
// store/index.ts
export { useTodoStore } from './todoStore';
export { useUIStore } from './uiStore';

// Re-export types if needed externally
export type { Todo } from './todoStore';
```

## Best Practices

1. **Separate State and Actions** in type definitions for clarity
2. **Use `persist` middleware** for data that should survive page reload
3. **Select only what you need** to prevent unnecessary re-renders
4. **Keep stores focused** - one domain per store
5. **Use `nanoid`** for generating unique IDs
6. **Include timestamps** (`createdAt`, `updatedAt`) for entities

````
