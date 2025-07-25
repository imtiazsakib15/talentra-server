import { Router } from "express";
import { AuthRoute } from "../modules/auth/auth.route";

const router = Router();

interface ModuleRoute {
  path: string;
  route: Router;
}

const moduleRoutes: ModuleRoute[] = [
  {
    path: "/auth",
    route: AuthRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
