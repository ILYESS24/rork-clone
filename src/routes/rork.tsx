import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";
import RorkHomePage from "@/pages/rork-home";

export const rorkRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/rork",
  component: RorkHomePage,
});
