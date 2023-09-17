import { AddApplicationCommand } from "./commands/add.command";
import { AddController } from "./controllers/add.controller";
import { bootstrap } from "blurp";
import { YoutubeService } from "./services/youtube.service";

bootstrap({
  commands: [AddApplicationCommand],
  controllers: [AddController],
});
