import { Router } from "express";
import { AuthRoute } from "../modules/auth/auth.route";
import { CandidateRoute } from "../modules/candidate/candidate.route";
import { CompanyRoute } from "../modules/company/company.route";
import { InvitationRoute } from "../modules/invitation/invitation.route";
import { SkillRoute } from "../modules/skill/skill.route";
import { InterviewRoute } from "../modules/interview/interview.route";
import { UserRoute } from "../modules/user/user.route";

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
  {
    path: "/skills",
    route: SkillRoute,
  },
  {
    path: "/invitations",
    route: InvitationRoute,
  },
  {
    path: "/interviews",
    route: InterviewRoute,
  },
  {
    path: "/users",
    route: UserRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
