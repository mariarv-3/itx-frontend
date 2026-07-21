/**
 * @jest-environment jsdom
 */

import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('renders the search input with an accessible label', () => {
    render(<SearchBar value="" onChange={() => {}} />);

    const input = screen.getByRole('searchbox', {
      name: /search by brand or model/i,
    });

    expect(input).toBeInTheDocument();
  });

  it('displays the correct placeholder text', () => {
    render(<SearchBar value="" onChange={() => {}} />);

    expect(screen.getByRole('searchbox')).toHaveAttribute(
      'placeholder',
      'Search by brand or model...'
    );
  });

  it('renders the controlled value', () => {
    render(<SearchBar value="Apple" onChange={() => {}} />);

    expect(screen.getByRole('searchbox')).toHaveValue('Apple');
  });

  it('updates the input value when the user types', async () => {
    const user = userEvent.setup();

    const ControlledSearchBar = () => {
      const [value, setValue] = useState('');

      return <SearchBar value={value} onChange={setValue} />;
    };

    render(<ControlledSearchBar />);

    const input = screen.getByRole('searchbox');

    await user.type(input, 'Samsung');

    expect(input).toHaveValue('Samsung');
  });

  it('calls onChange with an empty string when the user clears the input', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<SearchBar value="Apple" onChange={handleChange} />);

    const input = screen.getByRole('searchbox');

    await user.clear(input);

    expect(handleChange).toHaveBeenCalledWith('');
  });
});