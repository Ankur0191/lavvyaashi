"use strict";

const confirmationPhrase = "Lavvyaashi_2026";

if (!process.stdin.isTTY || !process.stdout.isTTY) {
  console.error(
    "This command requires a human-operated terminal. " +
      "Run it directly in an interactive terminal."
  );
  process.exit(1);
}

process.stdout.write("Password: ");
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding("utf8");

let answer = "";

const finish = () => {
  process.stdin.setRawMode(false);
  process.stdin.pause();
  process.stdout.write("\n");

  if (answer !== confirmationPhrase) {
    console.error("Authentication failed. The command was not run.");
    process.exit(1);
  }
};

process.stdin.on("data", (character) => {
  if (character === "\u0003") {
    process.exit(130);
  }

  if (character === "\r" || character === "\n") {
    finish();
    return;
  }

  if (character === "\u007f") {
    answer = answer.slice(0, -1);
    return;
  }

  answer += character;
});
