import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 5', () => {
  test('A página tem um h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const titleEl = screen.getByRole('heading', {
      name: 'Encountered pokémons', level: 2 });
    expect(titleEl).toBeInTheDocument();
  });

  it('Ao clicar no botão "Próximo pokémon" o próximo é exibido', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(buttonNext).toBeInTheDocument();
    const poke1 = screen.getByText(/pikachu/i);
    expect(poke1).toBeInTheDocument();
    userEvent.click(buttonNext);
    const poke2 = screen.getByText('Charmander');
    expect(poke2).toBeInTheDocument();
    userEvent.click(buttonNext);
    const poke3 = screen.getByText('Caterpie');
    expect(poke3).toBeInTheDocument();
    userEvent.click(buttonNext);
    const poke4 = screen.getByText('Ekans');
    expect(poke4).toBeInTheDocument();
    userEvent.click(buttonNext);
    const poke5 = screen.getByText('Alakazam');
    expect(poke5).toBeInTheDocument();
    userEvent.click(buttonNext);
    const poke6 = screen.getByText('Mew');
    expect(poke6).toBeInTheDocument();
    userEvent.click(buttonNext);
    const poke7 = screen.getByText('Rapidash');
    expect(poke7).toBeInTheDocument();
    userEvent.click(buttonNext);
    const poke8 = screen.getByText('Snorlax');
    expect(poke8).toBeInTheDocument();
    userEvent.click(buttonNext);
    const poke9 = screen.getByText('Dragonair');
    expect(poke9).toBeInTheDocument();
    userEvent.click(buttonNext);
    expect(poke1).toBeInTheDocument();
  });

  it('É mostrado apenas um pokemon por vez', () => {
    renderWithRouter(<App />);
    const pokemonEl = screen.getAllByText(/more/i);
    expect(pokemonEl).toHaveLength(1);
  });

  it('Pokedex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
    const buttonElectric = screen.getByRole('button', { name: /electric/i });
    expect(buttonElectric).toBeInTheDocument();
    userEvent.click(buttonElectric);
    const pokemonElectric = screen.getByText(/pikachu/i);
    expect(pokemonElectric).toBeInTheDocument();
    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(buttonNext).toBeDisabled();
    const pokeTypeButton = screen.getAllByTestId('pokemon-type-button');
    expect(pokeTypeButton[2]).toHaveTextContent('Bug');
    userEvent.click(buttonAll);
    const poke1 = screen.getByText(/pikachu/i);
    expect(poke1).toBeInTheDocument();
    userEvent.click(buttonNext);
    const poke2 = screen.getByText('Charmander');
    expect(poke2).toBeInTheDocument();
    userEvent.click(buttonNext);
    const poke3 = screen.getByText('Caterpie');
    expect(poke3).toBeInTheDocument();
  });
});
