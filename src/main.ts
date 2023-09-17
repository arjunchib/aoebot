import { AddApplicationCommand } from "./commands/add.command";
import { AddController } from "./controllers/add.controller";
import { bootstrap } from "blurp";

bootstrap({
  commands: [AddApplicationCommand],
  controllers: [AddController],
  applicationId: Bun.env.APPLICATION_ID!,
  botToken: Bun.env.BOT_TOKEN!,
  guilds: [Bun.env.GUILD_ID!],
});
