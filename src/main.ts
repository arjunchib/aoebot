import { AddCommand } from "./commands/units/units.command";
import { AddController } from "./commands/units/units.controller";
import { Router, bootstrap } from "blurp";

bootstrap({
  commands: [AddCommand],
  router: new Router([AddController]),
  guilds: [Bun.env.GUILD_ID!],
  port: 8787,
});
