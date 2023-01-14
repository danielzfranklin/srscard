# Script for populating the database. You can run it as:
# mix run priv/repo/seeds.exs

alias Api.Decks

wfr_deck =
  Decks.create_deck!(%{
    name: "WFR",
    id: "e8bc57a2-dcb8-4712-816c-2594f8d177dd"
  })

Decks.create_card!(%{
  deck_id: wfr_deck.id,
  front: "What is the list?",
  back: "- item a\n- item b\n    - item b.1"
})

Decks.create_card!(%{
  deck_id: wfr_deck.id,
  front: "What is the answer?",
  back: "42"
})

other_deck = Decks.create_deck!(%{name: "Other"})

Decks.create_card!(%{
  deck_id: other_deck.id,
  front: "What is the question?",
  back: "Dunno"
})
