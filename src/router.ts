import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/root";
import { Route as HomeRoute } from "./routes/rork-home";
import { Route as MarketplaceRoute } from "./routes/marketplace";
import { Route as BuilderRoute } from "./routes/builder";
import { Route as AIBuilderRoute } from "./routes/ai-builder";
import { Route as DashboardRoute } from "./routes/dashboard";
import { Route as ProfileRoute } from "./routes/profile";
import { Route as AuthRoute } from "./routes/auth";
import { Route as TeamsRoute } from "./routes/teams";
import { Route as AnalyticsRoute } from "./routes/analytics";
import { Route as AdminRoute } from "./routes/admin";
import { Route as DeploymentRoute } from "./routes/deployment";
import { NotFoundRedirect } from "./components/NotFoundRedirect";
import { ErrorBoundary } from "./components/ErrorBoundary";

const routeTree = rootRoute.addChildren([
  HomeRoute,
  MarketplaceRoute,
  BuilderRoute,
  AIBuilderRoute,
  DashboardRoute,
  ProfileRoute,
  AuthRoute,
  TeamsRoute,
  AnalyticsRoute,
  AdminRoute,
  DeploymentRoute,
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
