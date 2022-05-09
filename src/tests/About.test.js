import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 2', () => {
  test('A página contém informações sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const titleEl = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(titleEl).toBeInTheDocument();
  });

  it('Página contém dois parágrafos com texto sobre a Pokedex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const p1El = screen.getByText(/This application simulates a Pokédex/i);
    const p2El = screen.getByText(/One can filter Pokémons by type/i);
    expect(p1El).toBeInTheDocument();
    expect(p2El).toBeInTheDocument();
  });

  it('Página contém uma imagem específica de uma Pokedex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imageEl = screen.getByRole('img');
    expect(imageEl.src).toBe(url);
  });
});
