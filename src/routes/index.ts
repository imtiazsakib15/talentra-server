import { Router } from "express";
import { AuthRoute } from "../modules/auth/auth.route";
import { CandidateRoute } from "../modules/candidate/candidate.route";
import { CompanyRoute } from "../modules/company/company.route";

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
  {
    path: "/companies",
    route: CompanyRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
