import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Multiplefileupload from './Multiplefileupload';

describe('<Multiplefileupload />', () => {
  test('it should mount', () => {
    render(<Multiplefileupload />);
    
    const multiplefileupload = screen.getByTestId('Multiplefileupload');

    expect(multiplefileupload).toBeInTheDocument();
  });
});