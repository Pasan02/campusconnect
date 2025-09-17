import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ItemsDashboard from './ItemsDashboard';

const seedLocalStorage = ({ lost = [], found = [] } = {}) => {
  window.localStorage.setItem('lostItems', JSON.stringify(lost));
  window.localStorage.setItem('foundItems', JSON.stringify(found));
};

describe('ItemsDashboard', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('renders lost panel with items and count', async () => {
    const lostItems = [
      { id: 1, title: 'Lost Phone', description: 'Black iPhone', location: 'Library', createdAt: Date.now() },
      { id: 2, title: 'Lost Wallet', description: 'Brown leather', location: 'Cafeteria', createdAt: Date.now() - 1000 },
    ];
    seedLocalStorage({ lost: lostItems });

    render(
      <MemoryRouter initialEntries={[{ pathname: '/items' }]}>
        <ItemsDashboard />
      </MemoryRouter>
    );

    // Lost panel heading
    expect(screen.getByRole('heading', { name: /lost items/i })).toBeInTheDocument();

    // Count badge equals the number of filtered items
    const badge = screen.getAllByText(String(lostItems.length))[0];
    expect(badge).toBeInTheDocument();

    // Items titles present
    expect(screen.getByText('Lost Phone')).toBeInTheDocument();
    expect(screen.getByText('Lost Wallet')).toBeInTheDocument();
  });

  test('renders found panel with items and count', async () => {
    const foundItems = [
      { id: 10, title: 'Found Keys', description: 'Keychain with 3 keys', location: 'Gymnasium', createdAt: Date.now() },
      { id: 11, title: 'Found ID Card', description: 'Student ID', location: 'Student Union', createdAt: Date.now() - 2000 },
    ];
    seedLocalStorage({ found: foundItems });

    render(
      <MemoryRouter initialEntries={[{ pathname: '/items' }]}>
        <ItemsDashboard />
      </MemoryRouter>
    );

    // Found panel heading
    expect(screen.getByRole('heading', { name: /found items/i })).toBeInTheDocument();

    // Count badge equals the number of filtered items
    const badges = screen.getAllByText(String(foundItems.length));
    expect(badges.length).toBeGreaterThanOrEqual(1);

    // Items titles present
    expect(screen.getByText('Found Keys')).toBeInTheDocument();
    expect(screen.getByText('Found ID Card')).toBeInTheDocument();
  });

  test('shows empty states when no items', () => {
    seedLocalStorage({});

    render(
      <MemoryRouter>
        <ItemsDashboard />
      </MemoryRouter>
    );

    expect(screen.getByText(/no lost items/i)).toBeInTheDocument();
    expect(screen.getByText(/no found items/i)).toBeInTheDocument();
  });
});
