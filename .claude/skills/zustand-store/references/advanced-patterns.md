````markdown
# Zustand Advanced Patterns

## Table of Contents
1. Middleware Composition
2. Async Actions
3. Computed Values with Subscriptions
4. Store Slices
5. Immer Integration
6. DevTools Setup

## 1. Middleware Composition

```tsx
import { create } from 'zustand';
import { persist, devtools, subscribeWithSelector } from 'zustand/middleware';

export const useStore = create<Store>()(
  devtools(
    persist(
      subscribeWithSelector((set, get) => ({
        // ... store implementation
      })),
      { name: 'app-storage' }
    ),
    { name: 'AppStore' }
  )
);
```

### Middleware Order (inside → outside)
1. `subscribeWithSelector` - Enables granular subscriptions
2. `persist` - Handles localStorage persistence
3. `devtools` - Redux DevTools integration

## 2. Async Actions

```tsx
interface AsyncState {
  data: Item[];
  isLoading: boolean;
  error: string | null;
}

interface AsyncActions {
  fetchItems: () => Promise<void>;
  createItem: (data: CreateItemDTO) => Promise<void>;
}

export const useItemStore = create<AsyncState & AsyncActions>()((set, get) => ({
  data: [],
  isLoading: false,
  error: null,

  fetchItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/items');
      const data = await response.json();
      set({ data, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  createItem: async (itemData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData),
      });
      const newItem = await response.json();
      set((state) => ({
        data: [...state.data, newItem],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));
```

## 3. Computed Values with Subscriptions

```tsx
import { subscribeWithSelector } from 'zustand/middleware';

interface CartStore {
  items: CartItem[];
  // Computed values stored in state
  totalItems: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
}

export const useCartStore = create<CartStore>()(
  subscribeWithSelector((set, get) => ({
    items: [],
    totalItems: 0,
    totalPrice: 0,

    addItem: (item) =>
      set((state) => {
        const newItems = [...state.items, item];
        return {
          items: newItems,
          totalItems: newItems.length,
          totalPrice: newItems.reduce((sum, i) => sum + i.price, 0),
        };
      }),
  }))
);

// Subscribe to specific state changes
useCartStore.subscribe(
  (state) => state.items,
  (items) => {
    console.log('Items changed:', items.length);
  }
);
```

## 4. Store Slices (Large Stores)

```tsx
// slices/todosSlice.ts
import { StateCreator } from 'zustand';

export interface TodoSlice {
  todos: Todo[];
  addTodo: (title: string) => void;
  deleteTodo: (id: string) => void;
}

export const createTodoSlice: StateCreator<
  TodoSlice & UISlice, // Full store type
  [],
  [],
  TodoSlice
> = (set) => ({
  todos: [],
  addTodo: (title) =>
    set((state) => ({
      todos: [...state.todos, { id: nanoid(), title, completed: false }],
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    })),
});

// slices/uiSlice.ts
export interface UISlice {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const createUISlice: StateCreator<
  TodoSlice & UISlice,
  [],
  [],
  UISlice
> = (set) => ({
  isSidebarOpen: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
});

// store/index.ts - Combine slices
import { create } from 'zustand';
import { createTodoSlice, TodoSlice } from './slices/todosSlice';
import { createUISlice, UISlice } from './slices/uiSlice';

type AppStore = TodoSlice & UISlice;

export const useAppStore = create<AppStore>()((...args) => ({
  ...createTodoSlice(...args),
  ...createUISlice(...args),
}));
```

## 5. Immer Integration

```tsx
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface NestedState {
  user: {
    profile: {
      name: string;
      settings: {
        theme: 'light' | 'dark';
        notifications: boolean;
      };
    };
  };
  updateTheme: (theme: 'light' | 'dark') => void;
  updateName: (name: string) => void;
}

export const useUserStore = create<NestedState>()(
  immer((set) => ({
    user: {
      profile: {
        name: '',
        settings: {
          theme: 'light',
          notifications: true,
        },
      },
    },

    // Mutable syntax with Immer
    updateTheme: (theme) =>
      set((state) => {
        state.user.profile.settings.theme = theme;
      }),

    updateName: (name) =>
      set((state) => {
        state.user.profile.name = name;
      }),
  }))
);
```

## 6. Persist Options

```tsx
import { persist, createJSONStorage } from 'zustand/middleware';

export const useStore = create<Store>()(
  persist(
    (set) => ({
      // ... store
    }),
    {
      name: 'app-storage',
      
      // Custom storage (default: localStorage)
      storage: createJSONStorage(() => sessionStorage),
      
      // Partial persistence
      partialize: (state) => ({
        todos: state.todos,
        // Exclude: filter, isLoading, etc.
      }),
      
      // Version migration
      version: 1,
      migrate: (persistedState, version) => {
        if (version === 0) {
          // Migration logic from v0 to v1
          return { ...persistedState, newField: 'default' };
        }
        return persistedState as Store;
      },
      
      // Merge strategy
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...(persistedState as Partial<Store>),
      }),
    }
  )
);
```

## 7. Testing Stores

```tsx
// __tests__/todoStore.test.ts
import { useTodoStore } from '../todoStore';

describe('TodoStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useTodoStore.setState({ todos: [], filter: 'all' });
  });

  it('should add a todo', () => {
    const { addTodo } = useTodoStore.getState();
    
    addTodo('Test todo');
    
    const { todos } = useTodoStore.getState();
    expect(todos).toHaveLength(1);
    expect(todos[0].title).toBe('Test todo');
  });

  it('should toggle a todo', () => {
    useTodoStore.setState({
      todos: [{ id: '1', title: 'Test', completed: false, createdAt: '' }],
    });

    const { toggleTodo } = useTodoStore.getState();
    toggleTodo('1');

    const { todos } = useTodoStore.getState();
    expect(todos[0].completed).toBe(true);
  });
});
```

## 8. DevTools Setup

```tsx
// main.tsx or App.tsx
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { useTodoStore } from './store/todoStore';

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('TodoStore', useTodoStore);
}
```

Or use Redux DevTools (built-in middleware):

```tsx
import { devtools } from 'zustand/middleware';

export const useStore = create<Store>()(
  devtools(
    (set) => ({
      // ... store
    }),
    {
      name: 'MyStore',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);
```

````
