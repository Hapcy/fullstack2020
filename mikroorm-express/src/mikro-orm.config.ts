import { IDatabaseDriver, Configuration, Options } from "@mikro-orm/core";
import { Issue } from "./entities/issue";
import { Label } from "./entities/label";

export default {
  entities: [Issue, Label],
  dbName: 'issue-tracker.sqlite',
  type: 'sqlite',
} as Options<IDatabaseDriver> | Configuration<IDatabaseDriver>;
