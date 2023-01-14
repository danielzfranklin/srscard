defmodule Api.Decks.Card do
  use Ecto.Schema
  import Ecto.Changeset
  alias Api.Decks.Deck

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  @derive {Jason.Encoder,
           only: [
             :id,
             :deck_id,
             :front,
             :back,
             :inserted_at,
             :updated_at
           ]}
  schema "cards" do
    belongs_to :deck, Deck
    field :front, :string
    field :back, :string

    timestamps()
  end

  @doc false
  def changeset(card, attrs) do
    card
    |> cast(attrs, [:deck_id, :front, :back])
    |> validate_required([:deck_id, :front, :back])
  end
end
