# Storybook Advanced Patterns

## Table of Contents
1. MDX Documentation
2. Play Functions (Interaction Tests)
3. Accessibility Testing
4. Custom Addons Configuration

## 1. MDX Documentation

```mdx
{/* Button.mdx */}
import { Meta, Story, Canvas, Controls, Source } from '@storybook/blocks';
import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />

# Button

Buttons trigger actions. Use them for form submissions, dialogs, and navigation.

## Usage Guidelines

- Use **Primary** for main actions
- Use **Secondary** for alternative actions  
- Use **Ghost** for tertiary or cancel actions

<Canvas of={ButtonStories.Primary} />

## Props

<Controls />

## All Variants

<Canvas of={ButtonStories.AllVariants} />

## Code Example

<Source of={ButtonStories.Primary} />
```

## 2. Play Functions (Interaction Tests)

```tsx
import { within, userEvent, expect } from '@storybook/test';

export const SubmitForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find elements
    const emailInput = canvas.getByLabelText('Email');
    const passwordInput = canvas.getByLabelText('Password');
    const submitButton = canvas.getByRole('button', { name: /submit/i });
    
    // Interact
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);
    
    // Assert
    await expect(canvas.getByText('Success!')).toBeInTheDocument();
  },
};

export const ValidationError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    const submitButton = canvas.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);
    
    await expect(canvas.getByText('Email is required')).toBeInTheDocument();
  },
};
```

## 3. Accessibility Testing

```tsx
const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'button-name', enabled: true },
        ],
      },
    },
  },
};

// Story with specific a11y context
export const AccessibleButton: Story = {
  args: {
    'aria-label': 'Close dialog',
    children: '×',
  },
  parameters: {
    a11y: {
      element: 'button',
    },
  },
};
```

## 4. Parameters Reference

```tsx
const meta: Meta<typeof Component> = {
  parameters: {
    // Layout
    layout: 'centered' | 'fullscreen' | 'padded',
    
    // Backgrounds
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
    
    // Docs
    docs: {
      description: {
        component: 'Component description for docs page',
        story: 'Story-specific description',
      },
    },
    
    // Actions
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
};
```

## 5. Global Decorators (preview.tsx)

```tsx
// .storybook/preview.tsx
import type { Preview } from '@storybook/react';
import { ThemeProvider } from '../src/providers/ThemeProvider';
import '../src/styles/tokens.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```
