import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/root";
import { Route as HomeRoute } from "./routes/rork-home";
import { Route as MarketplaceRoute } from "./routes/marketplace";
import { Route as BuilderRoute } from "./routes/builder";
import { Route as DashboardRoute } from "./routes/dashboard";
import { Route as ProfileRoute } from "./routes/profile";
import { NotFoundRedirect } from "./components/NotFoundRedirect";
import { ErrorBoundary } from "./components/ErrorBoundary";

const routeTree = rootRoute.addChildren([
  HomeRoute,
  MarketplaceRoute,
  BuilderRoute,
  DashboardRoute,
  ProfileRoute,
]);

export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundRedirect,
  defaultErrorComponent: ErrorBoundary,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
