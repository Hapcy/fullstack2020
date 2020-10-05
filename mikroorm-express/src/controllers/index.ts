import { Router } from "express";
import { issuesRouter } from "./issues.controller";

export const routes = Router();

routes.use('/issues', issuesRouter);
