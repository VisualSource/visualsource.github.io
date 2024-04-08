import {
  readdir,
  writeFile,
  readFile,
  copyFile,
  mkdir,
} from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

function resolve(path) {
  return fileURLToPath(import.meta.resolve(path));
}

const INPUT_DIR = resolve("../packages");
const OUTPUT_DIR = resolve("../dist");
const OUTPUT_SCREENSHOTS = join(OUTPUT_DIR, "screenshots");
const OUTPUT_HTML = join(OUTPUT_DIR, "index.html");
const HTML_TEMPLETE = resolve("./index.html");

const list_item = /*html*/ `
    <li>
        <div style="margin-bottom: 10px; margin-top: 20px;">
          <span> {{ project_name }} |</span>
          <a href="{{ demo_link }}" target="_blank">View Demo</a>
        </div>
        <img src="{{ screenshot }}" alt="{{ screenshot_alt }}"/>
    </li>
`;
/*
    1. Read html content from index.html file
    2. read dist dir to get project names
    3. generate links to the projects
    4. copy screenshots for project to dist
    5. write html to dist
*/
try {
  const html = await readFile(HTML_TEMPLETE, {
    encoding: "utf-8",
  });

  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR);
  }

  if (!existsSync(OUTPUT_SCREENSHOTS)) {
    await mkdir(OUTPUT_SCREENSHOTS);
  }

  const projects = await readdir(INPUT_DIR);

  const links = [];

  for (const project of projects) {
    const screen_shot = join(INPUT_DIR, `${project}/screenshot.png`);
    if (!existsSync(screen_shot)) {
      continue;
    }

    const url = `/${project}`;
    const name = project
      .split("-")
      .map((e, i) => {
        if (i === 0) {
          e = e[0].toUpperCase() + e.substring(1);
        }
        return e;
      })
      .join(" ");

    await copyFile(screen_shot, join(OUTPUT_SCREENSHOTS, `${project}.png`));

    let item = list_item
      .replace("{{ project_name }}", name)
      .replace("{{ demo_link }}", url)
      .replace("{{ screenshot }}", `/screenshots/${project}.png`)
      .replace("{{ screenshot_alt }}", `${project} screenshot`);

    links.push(item);
  }

  const content = links.join("");

  const file = html.replace("{{ content }}", content);

  await writeFile(OUTPUT_HTML, file);
} catch (error) {
  console.error(error);
  process.exit(1);
}
