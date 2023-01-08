import { useMemo } from "react";
import { Link, useLocation, useMatches } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/20/solid";

import { useAppStore } from "../app/hooks";

export function Breadcrumbs() {
  const store = useAppStore();
  const matches = useMatches();

  const crumbs = useMemo(() => {
    const state = store.getState();
    return matches
      .slice(1)
      .map((match) => ({
        path: match.pathname,
        name: (match.handle as any).crumb?.(match.params, state),
      }))
      .filter(({ name }) => name !== undefined);
  }, [store, matches]);

  return (
    <nav
      className="flex border-b border-gray-200 bg-white"
      aria-label="Breadcrumb"
    >
      <ol className="mx-auto flex min-h-[44px] w-full max-w-screen-xl space-x-4 px-4 text-sm font-medium sm:px-6 lg:px-8">
        <li className="flex">
          <div className="flex items-center">
            <Link to="/" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>

        {crumbs.map(({ path, name }, idx) => (
          <li key={path} className="flex">
            <div className="flex items-center">
              <Separator />
              <Link
                to={path}
                className="ml-4 text-gray-500 hover:text-gray-700"
                aria-current={idx === crumbs.length - 1 ? "page" : undefined}
              >
                {name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Separator() {
  return (
    <svg
      className="w-6 flex-shrink-0 text-gray-200"
      viewBox="0 0 24 44"
      preserveAspectRatio="none"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
    </svg>
  );
}
