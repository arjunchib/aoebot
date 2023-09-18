import { AddApplicationCommand } from "./commands/add.command";
import { AddController } from "./controllers/add.controller";
import { NameRouter, bootstrap } from "blurp";

bootstrap({
  commands: [AddApplicationCommand],
  router: new NameRouter([AddController]),
  applicationId: Bun.env.APPLICATION_ID!,
  botToken: Bun.env.BOT_TOKEN!,
  publicKey: Bun.env.PUBLIC_KEY!,
  guilds: [Bun.env.GUILD_ID!],
  port: 8787,
});
