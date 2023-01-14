defmodule Site.Repo.Migrations.CreateCards do
  use Ecto.Migration

  def change do
    create table(:cards, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :deck_id, references(:decks, on_delete: :nothing, type: :binary_id)
      add :front, :string
      add :back, :string

      timestamps()
    end

    create index(:cards, [:deck_id])
  end
end
