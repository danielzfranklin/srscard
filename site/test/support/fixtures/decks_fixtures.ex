defmodule Site.DecksFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Site.Decks` context.
  """

  @doc """
  Generate a deck.
  """
  def deck_fixture(attrs \\ %{}) do
    {:ok, deck} =
      attrs
      |> Enum.into(%{
        name: "some name"
      })
      |> Site.Decks.create_deck()

    deck
  end

  @doc """
  Generate a card.
  """
  def card_fixture(attrs \\ %{}) do
    {:ok, card} =
      attrs
      |> Enum.into(%{
        back: "some back",
        front: "some front"
      })
      |> Site.Decks.create_card()

    card
  end
end
