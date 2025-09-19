import { Route } from "@tanstack/react-router";
import { rootRoute } from "./root";
import LibraryPage from "@/pages/library";
import { rorkRoute } from "./rork";

export const libraryRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/library",
  component: LibraryPage,
});

// Export all routes for the router
export const routes = [libraryRoute, rorkRoute];
