import del from 'del';
import { copySync } from 'cpx';
import { argv } from 'node:process';
import pkg from '../package.json' with { type: "json" };

const edition = argv[2];

const editions = ['staging', 'live'];
if (!edition || !editions.includes(edition)) {
  throw `Edition '${edition}' is not valid. Use: staging or live.`;
}

const appName = pkg.name;
const publishPath = `${pkg.config.publish_path}${edition}`;

// Cleanup
console.log(`Cleaning up ${publishPath}...`);
del.sync(`${publishPath}/dist/${appName}`, { force: true });

// Publish React build output
console.log(`Publishing ${edition} to ${publishPath}`);
copySync(`./dist/**/*.*`, `${publishPath}/dist/${appName}`);
console.log(`✅ React app published to '${edition}'`);

// Optional: also copy Razor & API
try {
  copySync(`../${edition}/api/**/*.*`, `${publishPath}/api`);
  console.log(`✅ API published to ${edition}`);
} catch { console.log(`⚠️ No API folder found for ${edition}`); }

try {
  copySync("../*.cshtml", `${publishPath}/..`);
  copySync("../!(react)/**/*.cshtml", `${publishPath}/..`);
  console.log(`✅ Razor files published`);
} catch { console.log(`⚠️ No Razor files found to publish`); }
