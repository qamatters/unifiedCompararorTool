import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Listfiles from './Listfiles';

describe('<Listfiles />', () => {
  test('it should mount', () => {
    render(<Listfiles />);
    
    const listfiles = screen.getByTestId('Listfiles');

    expect(listfiles).toBeInTheDocument();
  });
});