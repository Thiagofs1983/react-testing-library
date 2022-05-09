import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 3', () => {
  test(`É exibida a mensagem "No favorite pokemon found"
    caso a pessoa não tenha pokemons favoritos`, () => {
    renderWithRouter(<FavoritePokemons />);
    const notFoundEl = screen.getByText(/no favorite pokemon found/i);
    expect(notFoundEl).toBeInTheDocument();
  });

  it('São exibidos todos os cards de pokemons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/4');
    const CARDS_LENGTH = 2;
    const checkedPoke4 = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(checkedPoke4);
    history.push('/pokemons/65');
    const checkedPoke65 = screen.getByRole('checkbox');
    userEvent.click(checkedPoke65);
    history.push('/favorites');
    const allEl = screen.getAllByRole('link', { name: 'More details' });
    expect(allEl).toHaveLength(CARDS_LENGTH);
  });
});
