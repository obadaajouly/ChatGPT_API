import { config } from "dotenv";
config();
import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);

const userInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInput.prompt();
userInput.on("line", async (input) => {
  try {
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    });
    if (res.data.choices && res.data.choices.length > 0) {
      const message = res.data.choices[0].message;
      if (message && message.content) {
        console.log(message.content);
      } else {
        console.log("Unable to generate a response. Please try again.");
      }
    } else {
      console.log("Unable to generate a response. Please try again.");
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
    console.log("Please try again later.");
  }
  userInput.prompt();
});
