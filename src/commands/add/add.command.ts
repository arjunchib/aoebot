import { b } from "blurp";

export const AddCommand = b.slashCommand({
  name: "add",
  description: "add a meme from youtube",
  options: [
    b.string({
      name: "url",
      description: "youtube link",
      required: true,
    }),
  ],
});
