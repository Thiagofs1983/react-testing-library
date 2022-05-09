import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Requisito 4', () => {
  test('Testa se a página contem um h2 com o texto "Page requested not found 😭"', () => {
    renderWithRouter(<NotFound />);
    const h2El = screen.getByRole('heading', {
      name: /Page requested not found crying emoji/i, level: 2 });
    expect(h2El).toBeInTheDocument();
  });

  it('Testa se a página mostra a imagem especificada', () => {
    renderWithRouter(<NotFound />);
    const urlImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgEl = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(imgEl.src).toBe(urlImg);
  });
});
