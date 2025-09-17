import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ItemsDashboard from './ItemsDashboard';

// Helper to render with router
const renderWithRouter = (ui, { route = '/items' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/items" element={<ItemsDashboard />} />
      </Routes>
    </MemoryRouter>
  );
};

beforeEach(() => {
  // Reset localStorage between tests
  localStorage.clear();
});

describe('ItemsDashboard', () => {
  test('renders a lost item in Lost Items panel', async () => {
    const lostItem = {
      id: 1,
      title: 'Lost Wallet',
      description: 'Brown leather wallet',
      location: 'Library',
      image: null,
      createdAt: Date.now(),
    };
    localStorage.setItem('lostItems', JSON.stringify([lostItem]));

    renderWithRouter(<ItemsDashboard />);

    // Header/title for Lost panel
    expect(screen.getByRole('heading', { name: /lost items/i })).toBeInTheDocument();

    // Lost item title appears
    expect(await screen.findByText(/lost wallet/i)).toBeInTheDocument();

    // Lost items count badge shows 1
    expect(screen.getAllByText('1')[0]).toBeInTheDocument();
  });

  test('renders a found item in Found Items panel', async () => {
    const foundItem = {
      id: 2,
      title: 'Found Keys',
      description: 'Set of keys with a red tag',
      location: 'Cafeteria/Food Court',
      image: null,
      createdAt: Date.now(),
    };
    localStorage.setItem('foundItems', JSON.stringify([foundItem]));

    renderWithRouter(<ItemsDashboard />);

    // Header/title for Found panel
    expect(screen.getByRole('heading', { name: /found items/i })).toBeInTheDocument();

    // Found item title appears
    expect(await screen.findByText(/found keys/i)).toBeInTheDocument();

    // Found items count badge shows 1
    const badges = screen.getAllByText('1');
    expect(badges.length).toBeGreaterThan(0);
  });
});
