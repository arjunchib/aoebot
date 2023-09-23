import { UnitsCommand } from "./commands/units/units.command";
import { UnitsController } from "./commands/units/units.controller";
import { Router, bootstrap } from "blurp";

bootstrap({
  commands: [UnitsCommand],
  router: new Router([UnitsController]),
  guilds: [Bun.env.GUILD_ID!],
  port: 8787,
});
