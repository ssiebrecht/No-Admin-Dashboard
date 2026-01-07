# TypeScript React Patterns Reference

## Table of Contents
1. Generic Components
2. Polymorphic Components
3. Compound Components
4. Render Props
5. Higher-Order Components

## 1. Generic Components

```tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T) => string;
}

export const List = <T,>({ items, renderItem, keyExtractor }: ListProps<T>) => (
  <ul>
    {items.map((item, index) => (
      <li key={keyExtractor(item)}>{renderItem(item, index)}</li>
    ))}
  </ul>
);

// Usage
<List
  items={users}
  renderItem={(user) => <span>{user.name}</span>}
  keyExtractor={(user) => user.id}
/>
```

## 2. Polymorphic Components

```tsx
type AsProp<C extends React.ElementType> = { as?: C };

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

interface TextOwnProps {
  size?: 'sm' | 'md' | 'lg';
}

type TextProps<C extends React.ElementType> = PolymorphicComponentProp<C, TextOwnProps>;

export const Text = <C extends React.ElementType = 'span'>({
  as,
  size = 'md',
  children,
  ...props
}: TextProps<C>) => {
  const Component = as || 'span';
  return <Component className={`text--${size}`} {...props}>{children}</Component>;
};

// Usage
<Text as="h1" size="lg">Heading</Text>
<Text as="p">Paragraph</Text>
<Text as={Link} href="/home">Link</Text>
```

## 3. Compound Components

```tsx
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs compound components must be used within Tabs');
  return ctx;
};

interface TabsProps {
  defaultTab: string;
  children: ReactNode;
}

export const Tabs: FC<TabsProps> & {
  List: FC<{ children: ReactNode }>;
  Tab: FC<{ id: string; children: ReactNode }>;
  Panels: FC<{ children: ReactNode }>;
  Panel: FC<{ id: string; children: ReactNode }>;
} = ({ defaultTab, children }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
};

Tabs.Tab = ({ id, children }) => {
  const { activeTab, setActiveTab } = useTabsContext();
  return (
    <button 
      role="tab" 
      aria-selected={activeTab === id}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
};

Tabs.Panel = ({ id, children }) => {
  const { activeTab } = useTabsContext();
  if (activeTab !== id) return null;
  return <div role="tabpanel">{children}</div>;
};
```

## 4. Discriminated Unions for State

```tsx
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

const useAsync = <T,>(): [AsyncState<T>, (promise: Promise<T>) => void] => {
  const [state, setState] = useState<AsyncState<T>>({ status: 'idle' });

  const execute = useCallback((promise: Promise<T>) => {
    setState({ status: 'loading' });
    promise
      .then((data) => setState({ status: 'success', data }))
      .catch((error) => setState({ status: 'error', error }));
  }, []);

  return [state, execute];
};

// Type-safe usage
const [state, fetchData] = useAsync<User[]>();

if (state.status === 'success') {
  // TypeScript knows state.data exists here
  console.log(state.data);
}
```

## 5. Form Handling

```tsx
interface FormValues {
  email: string;
  password: string;
}

const useForm = <T extends Record<string, unknown>>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = <K extends keyof T>(field: K, value: T[K]) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const register = (field: keyof T) => ({
    value: values[field],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => 
      handleChange(field, e.target.value as T[typeof field]),
  });

  return { values, errors, setErrors, handleChange, register };
};
```
