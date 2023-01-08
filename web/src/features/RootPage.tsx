import { Outlet } from "react-router-dom";
import { Breadcrumbs } from "./Breadcrumbs";

export default function RootPage() {
  return (
    <div className="h-full">
      <Breadcrumbs />

      <Outlet />
    </div>
  );
}
