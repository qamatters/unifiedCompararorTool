import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Informationcard from './Informationcard';

describe('<Informationcard />', () => {
  test('it should mount', () => {
    render(<Informationcard />);
    
    const informationcard = screen.getByTestId('Informationcard');

    expect(informationcard).toBeInTheDocument();
  });
});