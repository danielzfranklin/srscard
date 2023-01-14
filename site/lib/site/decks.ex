defmodule Site.Decks do
  @moduledoc """
  The Decks context.
  """

  import Ecto.Query, warn: false
  alias Site.Repo

  alias Site.Decks.Deck
  alias Site.Decks.Card

  def list_decks do
    Repo.all(Deck)
  end

  def get_deck!(id), do: Repo.get!(Deck, id)

  def create_deck(attrs) do
    %Deck{}
    |> Deck.changeset(attrs)
    |> Repo.insert()
  end

  def create_deck!(attrs) do
    {:ok, deck} = create_deck(attrs)
    deck
  end

  def update_deck(%Deck{} = deck, attrs) do
    deck
    |> Deck.changeset(attrs)
    |> Repo.update()
  end

  def update_deck!(%Deck{} = deck, attrs) do
    {:ok, deck} = update_deck(deck, attrs)
    deck
  end

  def delete_deck(%Deck{} = deck) do
    Repo.delete(deck)
  end

  def delete_deck!(%Deck{} = deck) do
    {:ok, deck} = delete_deck(deck)
    deck
  end

  def change_deck(%Deck{} = deck, attrs \\ %{}) do
    Deck.changeset(deck, attrs)
  end

  def list_cards(%Deck{id: deck_id}) do
    Card
    |> where(deck_id: ^deck_id)
    |> Repo.all()
  end

  def get_card!(id), do: Repo.get!(Card, id)

  def create_card(attrs) do
    %Card{}
    |> Card.changeset(attrs)
    |> Repo.insert()
  end

  def create_card!(attrs) do
    {:ok, card} = create_card(attrs)
    card
  end

  def update_card(%Card{} = card, attrs) do
    card
    |> Card.changeset(attrs)
    |> Repo.update()
  end

  def update_card!(%Card{} = card, attrs) do
    {:ok, card} = update_card(card, attrs)
    card
  end

  def delete_card(%Card{} = card) do
    Repo.delete(card)
  end

  def delete_card!(%Card{} = card) do
    {:ok, card} = delete_card(card)
    card
  end

  def change_card(%Card{} = card, attrs \\ %{}) do
    Card.changeset(card, attrs)
  end
end
