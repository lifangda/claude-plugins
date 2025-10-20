# Frontend Testing

React, Vue, and other frontend component testing with Testing Library.

## Pattern 1: React Component Testing

```typescript
// components/UserForm.tsx
import { useState } from 'react';

interface Props {
  onSubmit: (user: { name: string; email: string }) => void;
}

export function UserForm({ onSubmit }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        data-testid="name-input"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        data-testid="email-input"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// components/UserForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UserForm } from './UserForm';

describe('UserForm', () => {
  it('should render form inputs', () => {
    render(<UserForm onSubmit={vi.fn()} />);

    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should update input values', () => {
    render(<UserForm onSubmit={vi.fn()} />);

    const nameInput = screen.getByTestId('name-input') as HTMLInputElement;
    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
  });

  it('should call onSubmit with form data', () => {
    const onSubmit = vi.fn();
    render(<UserForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
    });
  });
});
```

## Pattern 2: Testing Hooks

```typescript
// hooks/useCounter.ts
import { useState, useCallback } from 'react';

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount((c) => c + 1), []);
  const decrement = useCallback(() => setCount((c) => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return { count, increment, decrement, reset };
}

// hooks/useCounter.test.ts
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('should initialize with custom value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  it('should increment count', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it('should decrement count', () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4);
  });

  it('should reset to initial value', () => {
    const { result } = renderHook(() => useCounter(10));

    act(() => {
      result.current.increment();
      result.current.increment();
    });

    expect(result.current.count).toBe(12);

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(10);
  });
});
```

## Pattern 3: Testing Async Components

```typescript
// components/UserList.tsx
import { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
}

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// components/UserList.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UserList } from './UserList';

global.fetch = vi.fn();

describe('UserList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show loading state', () => {
    (fetch as any).mockImplementation(() => new Promise(() => {}));
    render(<UserList />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render users', async () => {
    const mockUsers = [
      { id: '1', name: 'John' },
      { id: '2', name: 'Jane' },
    ];

    (fetch as any).mockResolvedValueOnce({
      json: async () => mockUsers,
    });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();
    });
  });

  it('should show error state', async () => {
    (fetch as any).mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
    });
  });
});
```

## Vue Component Testing

```typescript
// components/UserForm.vue
<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="name" placeholder="Name" data-testid="name-input" />
    <input v-model="email" type="email" placeholder="Email" data-testid="email-input" />
    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  onSubmit: (user: { name: string; email: string }) => void;
}>();

const name = ref('');
const email = ref('');

const handleSubmit = () => {
  props.onSubmit({ name: name.value, email: email.value });
};
</script>

// components/UserForm.test.ts
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import UserForm from './UserForm.vue';

describe('UserForm', () => {
  it('should render form', () => {
    const wrapper = mount(UserForm, {
      props: { onSubmit: vi.fn() },
    });

    expect(wrapper.find('[data-testid="name-input"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="email-input"]').exists()).toBe(true);
  });

  it('should update input values', async () => {
    const wrapper = mount(UserForm, {
      props: { onSubmit: vi.fn() },
    });

    await wrapper.find('[data-testid="name-input"]').setValue('John');
    await wrapper.find('[data-testid="email-input"]').setValue('john@example.com');

    expect(wrapper.find('[data-testid="name-input"]').element.value).toBe('John');
    expect(wrapper.find('[data-testid="email-input"]').element.value).toBe('john@example.com');
  });

  it('should call onSubmit', async () => {
    const onSubmit = vi.fn();
    const wrapper = mount(UserForm, {
      props: { onSubmit },
    });

    await wrapper.find('[data-testid="name-input"]').setValue('John');
    await wrapper.find('[data-testid="email-input"]').setValue('john@example.com');
    await wrapper.find('form').trigger('submit');

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'John',
      email: 'john@example.com',
    });
  });
});
```

## Testing User Interactions

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('User Interactions', () => {
  it('should handle click events', async () => {
    const handleClick = vi.fn();
    render(<button onClick={handleClick}>Click me</button>);

    await userEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should handle keyboard input', async () => {
    render(<input data-testid="input" />);

    const input = screen.getByTestId('input');
    await userEvent.type(input, 'Hello World');

    expect(input).toHaveValue('Hello World');
  });

  it('should handle form submission', async () => {
    const handleSubmit = vi.fn();
    render(
      <form onSubmit={handleSubmit}>
        <input data-testid="input" />
        <button type="submit">Submit</button>
      </form>
    );

    await userEvent.type(screen.getByTestId('input'), 'test');
    await userEvent.click(screen.getByRole('button'));

    expect(handleSubmit).toHaveBeenCalled();
  });
});
```
