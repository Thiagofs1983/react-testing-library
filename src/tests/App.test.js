import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 1', () => {
  test('Testa se o topo da aplicação contem um conjunto fixo de links', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const homeLinkEl = screen.getByRole('link', { name: /home/i });
    const aboutLinkEl = screen.getByRole('link', { name: /about/i });
    const favoriteLinkEl = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(homeLinkEl).toBeInTheDocument();
    expect(aboutLinkEl).toBeInTheDocument();
    expect(favoriteLinkEl).toBeInTheDocument();
  });

  it('A página é redirecionada para pagina inicial da URL / ao clicar em "Home"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const pokedexEl = screen.getByRole('heading', { name: /pokédex/i, level: 1 });
    expect(pokedexEl).toBeInTheDocument();
  });

  it(
    'É redirecionada para página about, na URL /about ao clicar em "About"', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/about');
      const aboutEl = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
      expect(aboutEl).toBeInTheDocument();
    },
  );

  it(
    'Redireciona para página /favorites ao clicar em "Favorite Pokémons"', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/favorites');
      const favoritesEl = screen.getByRole(
        'heading', { name: 'Favorite pokémons', level: 2 },
      );
      expect(favoritesEl).toBeInTheDocument();
    },
  );

  it(
    'Redireciona para página Not Found ao entrar em uma URL desconhecida', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/notFound');
      const notFoundEl = screen.getByRole(
        'heading', { name: 'Page requested not found Crying emoji', level: 2 },
      );
      expect(notFoundEl).toBeInTheDocument();
    },
  );
});
