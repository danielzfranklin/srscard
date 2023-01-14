defmodule SiteWeb.EditorController do
  use SiteWeb, :controller
  alias Site.Decks

  def index(conn, _params) do
    deck = Decks.get_deck!("e8bc57a2-dcb8-4712-816c-2594f8d177dd")
    cards = Decks.list_cards(deck)

    render(conn, "index.html", %{
      app_props:
        Jason.encode!(%{
          deck: deck,
          cards: cards
        })
    })
  end
end
