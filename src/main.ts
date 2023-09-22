import { AddCommand } from "./commands/add/add.command";
import { AddController } from "./commands/add/add.controller";
import { Router, bootstrap } from "blurp";

bootstrap({
  commands: [AddCommand],
  router: new Router([AddController]),
  guilds: [Bun.env.GUILD_ID!],
  port: 8787,
});
