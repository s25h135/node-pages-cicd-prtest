import test from "node:test";
import assert from "node:assert/strict";

const message = "Push をきっかけに自動テスト・自動デプロイされています。";

test("message should mention automatic deployment", () => {
  assert.match(message, /自動デプロイ/);
});

test("message should not be empty", () => {
  assert.notEqual(message.trim(), "");
});
