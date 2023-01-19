import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Comparefile from './Comparefile';

describe('<Comparefile />', () => {
  test('it should mount', () => {
    render(<Comparefile />);
    
    const comparefile = screen.getByTestId('Comparefile');

    expect(comparefile).toBeInTheDocument();
  });
});