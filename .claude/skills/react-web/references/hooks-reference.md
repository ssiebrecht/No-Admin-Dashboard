# React 19 Hooks Reference

## Core Hooks

### useState
Manage local component state.
```tsx
const [value, setValue] = useState<T>(initialValue);
```

### useEffect
Side effects, subscriptions, DOM mutations.
```tsx
useEffect(() => {
  // effect
  return () => { /* cleanup */ };
}, [dependencies]);
```

### useContext
Access context value.
```tsx
const value = useContext(MyContext);
```

### useRef
Mutable ref that persists across renders.
```tsx
const ref = useRef<HTMLInputElement>(null);
```

### useMemo
Memoize expensive computations.
```tsx
const memoized = useMemo(() => expensiveCalc(a, b), [a, b]);
```

### useCallback
Memoize callback functions.
```tsx
const callback = useCallback(() => doSomething(a), [a]);
```

## React 19 New Hooks

### use
Read promises and context in render (can be conditional).
```tsx
const data = use(promise);
const theme = use(ThemeContext);
```

### useActionState
Handle form actions with state.
```tsx
const [state, formAction, isPending] = useActionState(
  async (prevState, formData) => { /* action */ },
  initialState
);
```

### useFormStatus
Access parent form's submission state.
```tsx
const { pending, data, method, action } = useFormStatus();
```

### useOptimistic
Optimistic UI updates during async operations.
```tsx
const [optimisticState, addOptimistic] = useOptimistic(
  state,
  (currentState, optimisticValue) => newState
);
```

### useTransition
Mark updates as non-blocking transitions.
```tsx
const [isPending, startTransition] = useTransition();
startTransition(() => setSlowState(newValue));
```

### useDeferredValue
Defer re-rendering of non-urgent updates.
```tsx
const deferredValue = useDeferredValue(value);
```

### useId
Generate unique IDs for accessibility.
```tsx
const id = useId(); // e.g., ":r1:"
```

## Custom Hook Patterns

### useLocalStorage
```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const [stored, setStored] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(stored) : value;
    setStored(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [stored, setValue] as const;
}
```

### useDebounce
```tsx
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

### useMediaQuery
```tsx
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
```
