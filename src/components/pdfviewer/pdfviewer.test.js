import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Pdfviewer from './Pdfviewer';

describe('<Pdfviewer />', () => {
  test('it should mount', () => {
    render(<Pdfviewer />);
    
    const pdfviewer = screen.getByTestId('Pdfviewer');

    expect(pdfviewer).toBeInTheDocument();
  });
});