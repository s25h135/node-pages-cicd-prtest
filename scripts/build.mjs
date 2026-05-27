import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const srcDir = path.join(projectRoot, "src");
const distDir = path.join(projectRoot, "dist");

const templatePath = path.join(srcDir, "index.template.html");
const appJsPath = path.join(srcDir, "app.js");
const styleCssPath = path.join(srcDir, "style.css");
const messagesPath = path.join(srcDir, "messages.json");

const template = fs.readFileSync(templatePath, "utf-8");
const messages = JSON.parse(fs.readFileSync(messagesPath, "utf-8"));

const title = "Node.js CI/CD Group Sample";
const heading = "GitHub Actions + GitHub Pages + Pull Request Demo";
const builtAt = new Date().toISOString();
const commitSha = process.env.GITHUB_SHA || "local-build";

const messageListHtml = messages
  .map(
    (item) => `\n<li><span class="message-name">${escapeHtml(item.name)}</span>: ${escapeHtml(item.message)}</li>`
  )
  .join("");

const outputHtml = template
  .replaceAll("{{TITLE}}", title)
  .replaceAll("{{HEADING}}", heading)
  .replaceAll("{{MESSAGE_LIST}}", messageListHtml)
  .replaceAll("{{BUILT_AT}}", builtAt)
  .replaceAll("{{COMMIT_SHA}}", commitSha);

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

fs.writeFileSync(path.join(distDir, "index.html"), outputHtml, "utf-8");
fs.copyFileSync(appJsPath, path.join(distDir, "app.js"));
fs.copyFileSync(styleCssPath, path.join(distDir, "style.css"));

console.log("Build completed successfully.");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
