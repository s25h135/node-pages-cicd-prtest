import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const messages = JSON.parse(fs.readFileSync("./src/messages.json", "utf-8"));

test("messages should be an array", () => {
  assert.equal(Array.isArray(messages), true);
});

test("messages should contain at least one entry", () => {
  assert.ok(messages.length >= 1);
});

test("each entry should have name and message", () => {
  for (const item of messages) {
    assert.equal(typeof item.name, "string");
    assert.equal(typeof item.message, "string");
    assert.notEqual(item.name.trim(), "");
    assert.notEqual(item.message.trim(), "");
  }
});
