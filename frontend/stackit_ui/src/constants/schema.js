// Shared schema format — used by everyone
export const QuestionSchema = {
    id: "string",
    title: "string",
    description: "string", // Rich HTML
    tags: ["string"],
    createdAt: "timestamp",
    author: {
      name: "string",
      uid: "string"
    },
    answers: [
      {
        id: "string",
        description: "string",
        votes: 0,
        author: { name: "string", uid: "string" }
      }
    ]
  };
  