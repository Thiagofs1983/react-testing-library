import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 7', () => {
  const pokeDetails = '/pokemons/25';
  test('As informações detalhadas do pokemon selecionado são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pokeDetails);
    const titleDetails = screen.getByRole('heading', {
      name: /pikachu details/i, level: 2 });
    expect(titleDetails).toBeInTheDocument();
    const pokemonDetailLink = screen.queryByRole('link', { name: /more details/i });
    expect(pokemonDetailLink).not.toBeInTheDocument();
    const summaryEl = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(summaryEl).toBeInTheDocument();
    const summaryParagraphEl = screen.getByText(/This intelligent Pokémon roasts hard/i);
    expect(summaryParagraphEl).toBeInTheDocument();
  });

  it('Existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pokeDetails);
    const gameLocationEl = screen.getByRole('heading', {
      name: 'Game Locations of Pikachu', level: 2 });
    expect(gameLocationEl).toBeInTheDocument();
    const pikachuLocation = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(pikachuLocation).toHaveLength(2);
    const locationName = screen.getByText('Kanto Viridian Forest');
    expect(locationName).toBeInTheDocument();
    const locationName2 = screen.getByText('Kanto Power Plant');
    expect(locationName2).toBeInTheDocument();
    expect(pikachuLocation[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pikachuLocation[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('O usuario pode favoritar o pokemon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pokeDetails);
    const favoriteEl = screen.getByRole('checkbox', { name: /pokémon favoritado?/i });
    userEvent.click(favoriteEl);
    const star = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(star).toBeInTheDocument();
    expect(star).toHaveAttribute('src', '/star-icon.svg');
    userEvent.click(favoriteEl);
    expect(star).not.toBeInTheDocument();
  });
});
