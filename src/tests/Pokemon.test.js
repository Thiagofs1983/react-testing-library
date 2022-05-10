import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 6', () => {
  const pokemonDetail = '/pokemons/25';
  test('Testa se é renderizado um card com as informações do pokemon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    const pokemonImageLink = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const pokemonImage = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(pokemonImage.src).toBe(pokemonImageLink);
  });

  it('O card do pokemon contem um link de navegação para exibir detalhes', () => {
    renderWithRouter(<App />);
    const linkDetail = screen.getByRole('link', { name: /more details/i });
    expect(linkDetail).toBeInTheDocument();
    expect(linkDetail).toHaveAttribute('href', pokemonDetail);
  });

  it('Ao clicar no link de navegação é feito o redirecionamento para a detalhes', () => {
    renderWithRouter(<App />);
    const linkDetail = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetail);
    const titleEl = screen.getByRole('heading', { name: /pikachu details/i, level: 2 });
    expect(titleEl).toBeInTheDocument();
  });

  it('A URL do navegador muda para "/pokemon/25"', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pokemonDetail);
    const { location: { pathname } } = history;
    expect(pathname).toBe(pokemonDetail);
  });

  it('Existe um ícone de estrela nos pokemons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pokemonDetail);
    const favorite = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    userEvent.click(favorite);
    const star = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(star).toBeInTheDocument();
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
