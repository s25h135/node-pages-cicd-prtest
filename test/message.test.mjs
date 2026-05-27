import test from "node:test";
import assert from "node:assert/strict";

const message = "GitHub Actions により、テストとデプロイが自動実行されています。";

test("message should mention automatic deployment", () => {
  assert.match(message, /デプロイ/);
});

test("message should not be empty", () => {
  assert.notEqual(message.trim(), "");
});
