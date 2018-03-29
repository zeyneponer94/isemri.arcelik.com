/* eslint-disable consistent-return, no-console */

const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

function updateConfig(directory) {
  if (process.env.ISSUER === undefined || process.env.CLIENT_ID === undefined) {
    console.log('[ERROR] Please set the ISSUER and CLIENT_ID Environment variables');
    return;
  }

  const file = path.join(__dirname, '..', directory, '/src/app/.samples.config.ts');
  const data = fs.readFileSync(file, 'utf8');
  let result = data.replace(/{clientId}/g, process.env.CLIENT_ID);
  result = result.replace(/https:\/\/{yourOktaDomain}.com\/oauth2\/default/g, process.env.ISSUER);
  fs.writeFileSync(file, result, 'utf8');
}

function cloneRepository(repository, directory) {
  const dir = path.join(__dirname, '..', directory);
  if (fs.existsSync(dir)) {
    console.log(`${directory} is already cloned.`);
    return;
  }

  const command = `git clone ${repository}`;
  console.log(`Cloning repository ${directory}`);
  exec(command, (err, stdout) => {
    if (err !== null) {
      return console.error(err);
    }
    return console.log(stdout);
  });
}

updateConfig('custom-login');
updateConfig('okta-hosted-login');
cloneRepository('https://github.com/okta/samples-java-spring-mvc.git', 'samples-java-spring-mvc');
cloneRepository('https://github.com/okta/okta-oidc-tck.git', 'okta-oidc-tck');
