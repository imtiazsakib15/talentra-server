import { Router } from "express";
import { AuthRoute } from "../modules/auth/auth.route";
import { CandidateRoute } from "../modules/candidate/candidate.route";

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
  {
    path: "/candidates",
    route: CandidateRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
