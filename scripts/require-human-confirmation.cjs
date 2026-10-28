"use strict";

const readline = require("node:readline");

const confirmationPhrase = "Lavvyaashi_2026";

if (!process.stdin.isTTY || !process.stdout.isTTY) {
  console.error(
    "This command requires a human-operated terminal. " +
      "Run it directly in an interactive terminal."
  );
  process.exit(1);
}

const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

prompt.question(
  `Type "${confirmationPhrase}" to continue: `,
  (answer) => {
    prompt.close();

    if (answer.trim() !== confirmationPhrase) {
      console.error("Confirmation failed. The command was not run.");
      process.exit(1);
    }
  }
);
