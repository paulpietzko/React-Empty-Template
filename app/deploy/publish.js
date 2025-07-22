const del = require('del');
const cpx = require('cpx');
const edition = process.argv[2];
const pkg = require('../package.json');

const editions = ['staging', 'live'];
if (!edition || !editions.includes(edition)) {
  throw `Edition '${edition}' is not valid. Use: staging or live.`;
}

const appName = pkg.name;
const publishPath = `${pkg.config.publish_path}/${edition}`;

// Cleanup
console.log(`Cleaning up ${publishPath}...`);
del.sync(`${publishPath}/dist/${appName}`, { force: true });

// Publish dist
console.log(`Publishing ${edition} to ${publishPath}`);
cpx.copySync(`./build/**/*.*`, `${publishPath}/dist/${appName}`);
console.log(`React build for '${edition}' published...`);

// Optional extras, if needed:
cpx.copySync(`../${edition}/api/**/*.*`, `${publishPath}/api`);
console.log(`API for '${edition}' published...`);

cpx.copySync("../*.cshtml", `${publishPath}/..`);
cpx.copySync("../!(react)/**/*.cshtml", `${publishPath}/..`);
console.log(`Razor files published...`);
