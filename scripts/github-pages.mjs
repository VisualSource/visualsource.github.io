// scripts/github-pages.mts
import { readdir, writeFile, readFile, copyFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import { join } from "node:path";
function reslove(path) {
  return fileURLToPath(import.meta.resolve(path));
}
var paths = {
  INPUT: {
    PROJECTS: reslove("../packages"),
    TEMPLETE: reslove("./index.html")
  },
  OUTPUTS: {
    DIR: reslove("../dist"),
    SCREENSHOTS: "screenshots",
    HTML: "index.html"
  }
};
var imageItem = `
    <li>
        <div style="margin-bottom: 10px; margin-top: 20px;">
          <span>{{project_name}} |</span>
          <a href="{{demo_link}}" target="_blank">View Demo</a>
        </div>
        <img src="{{screenshot}}" alt="{{screenshot_alt}}"/>
    </li>
`;
var linkItem = `
  <li>
     <div style="margin-bottom: 10px; margin-top: 20px;">
        <span>{{project_name}} |</span>
        <a href="{{link}}" target="_blank">View Page</a>
      </div>
  </li>
`;
try {
  if (!existsSync(paths.OUTPUTS.DIR))
    await mkdir(paths.OUTPUTS.DIR);
  const screenshotDir = join(paths.OUTPUTS.DIR, paths.OUTPUTS.SCREENSHOTS);
  if (!existsSync(screenshotDir))
    await mkdir(screenshotDir);
  const outputScreenshots = join(paths.OUTPUTS.DIR, paths.OUTPUTS.SCREENSHOTS);
  const links = [];
  for (const project of await readdir(paths.INPUT.PROJECTS)) {
    const url = `/${project}`;
    const name = project.split("-").map((e, i) => e.replace(/^./, e[0].toUpperCase())).join(" ");
    const screenshot = join(paths.INPUT.PROJECTS, `${project}/screenshot.png`);
    if (!existsSync(screenshot)) {
      links.push({
        templete: linkItem.replace("{{project_name}}", name).replace("{{link}}", url),
        type: 1
      });
      continue;
    }
    await copyFile(screenshot, join(outputScreenshots, `${project}.png`));
    links.push({
      templete: imageItem.replace("{{project_name}}", name).replace("{{demo_link}}", url).replace("{{screenshot}}", `/screenshots/${project}.png`).replace("{{screenshot_alt}}", `${project} screenshot`),
      type: 0
    });
  }
  const imageContent = links.filter((e) => e.type === 0).map((e) => e.templete).join("");
  const linkContent = links.filter((e) => e.type === 1).map((e) => e.templete).join("");
  const html = await readFile(paths.INPUT.TEMPLETE, {
    encoding: "utf-8"
  });
  const file = html.replace("{{mainContent}}", imageContent).replace("{{linksContent}}", linkContent);
  await writeFile(join(paths.OUTPUTS.DIR,paths.OUTPUTS.HTML), file);
} catch (error) {
  console.error(error);
  process.exit(1);
}
