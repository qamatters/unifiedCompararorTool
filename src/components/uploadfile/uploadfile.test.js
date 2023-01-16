import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Uploadfile from './Uploadfile';

describe('<Uploadfile />', () => {
  test('it should mount', () => {
    render(<Uploadfile />);
    
    const uploadfile = screen.getByTestId('Uploadfile');

    expect(uploadfile).toBeInTheDocument();
  });
});