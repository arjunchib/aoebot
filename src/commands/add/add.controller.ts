import { Interaction, inject } from "blurp";
import { YoutubeService } from "../../services/youtube.service";

export class AddController {
  youtube = inject(YoutubeService);

  async chatInput(interaction: Interaction) {
    this.youtube.download();
    interaction.respondWith({
      type: 4,
      data: { content: "It Worked!" },
    });
  }
}
