import { EntityRepository, MikroORM, IDatabaseDriver } from "@mikro-orm/core";
import { Issue } from "../entities/issue";

declare global {
  namespace Express {
    interface Request {
      orm: MikroORM<IDatabaseDriver>;
      issuesRepository?: EntityRepository<Issue>;
    }
  }
}
