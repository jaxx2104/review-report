const chalk = require('chalk')
const figlet = require('figlet')
const program = require('commander')

import getReviews from './services/getReviews'
import { init } from './api/github'

program
  .version('0.1.0')
  .option('-u, --url <url>', 'GitHub API url', 'https://api.github.com/')
  .option('-r, --repo <account/repo>', 'GitHub Repository')
  .option('-t, --token <token>', 'GitHub Personal Access Token')
  .option('--max <n>', 'GitHub Max PullRequests')
  .option('--figlet <font>', 'figlet mode')
  .parse(process.argv)

if (!program.repo || !program.token) {
  console.log(chalk.white.bgRed.bold('[error] required --repo --token '))
  program.outputHelp()
  process.exit(1)
}

const baseURL = program.url || 'https://api.github.com/'
const repository = program.repo || ''
const token = program.token || ''
const max = program.max || 10

const outputFiglet = results => {
  const font = program.figlet || 'Graffiti'
  const ranker = (results || [])[0].user
  console.log(
    chalk.magenta.bold(
      figlet.textSync(ranker, {
        font,
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  )
}

const outputTable = results => {
  console.table(results)
}

const run = async () => {
  init({ baseURL, token, repository })
  const results = await getReviews({ max })
  if (program.figlet) {
    outputFiglet(results)
  } else {
    outputTable(results)
  }
}
run()
