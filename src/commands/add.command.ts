export const AddApplicationCommand = {
  name: "add",
  description: "add a meme from youtube",
  options: [
    {
      name: "url",
      description: "youtube link",
      required: true,
      type: 3,
    },
  ],
};
