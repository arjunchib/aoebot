import { AddApplicationCommand } from "./commands/add.command";
import { AddController } from "./controllers/add.controller";
import { Router, bootstrap } from "blurp";

bootstrap({
  commands: [AddApplicationCommand],
  router: new Router([AddController]),
  guilds: [Bun.env.GUILD_ID!],
  port: 8787,
});
