defmodule SiteWeb.EditorController do
  use SiteWeb, :controller

  def index(conn, _params) do
    app_props = %{
      deck_name: "WFR"
    }

    render(conn, "index.html", %{app_props: Jason.encode!(app_props)})
  end
end
