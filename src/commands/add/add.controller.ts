import { inject } from "blurp";
import { YoutubeService } from "../../services/youtube.service";

export class AddController {
  youtube = inject(YoutubeService);

  async chatInput(interaction) {
    this.youtube.download();
    return {
      type: 4,
      data: { content: "It Worked!" },
    };
  }
}
