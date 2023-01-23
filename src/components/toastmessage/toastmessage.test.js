import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Toastmessage from './Toastmessage';

describe('<Toastmessage />', () => {
  test('it should mount', () => {
    render(<Toastmessage />);
    
    const toastmessage = screen.getByTestId('Toastmessage');

    expect(toastmessage).toBeInTheDocument();
  });
});