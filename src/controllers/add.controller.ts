import { inject } from "blurp";
import { YoutubeService } from "../services/youtube.service";

export class AddController {
  youtube = inject(YoutubeService);

  chatInput(interaction: any) {
    this.youtube.download();
    return {
      type: 4,
      data: { content: "It Worked!" },
    };
  }
}
