import { execSync } from 'child_process'
import { existsSync } from 'fs'
import * as fs from 'fs/promises'
import * as path from 'path'

async function main() {
  if (process.argv.length !== 3) {
    console.error('Expected one argument: <version>')
    process.exit(1)
  }

  const newVersion = process.argv[2]

  if (!/^\d+\.\d+\..*$/.test(newVersion)) {
    console.error('Version format should be X.Y.Z')
    process.exit(1)
  }

  await updatePackageVersion(newVersion)
  await tagDocumentation(newVersion)
  await updateDocusaurusConfig(newVersion)
}

async function updatePackageVersion(newVersion: string) {
  const filePath = path.join(__dirname, 'package.json')
  let contents = await fs.readFile(filePath, 'utf-8')

  contents = contents.replace(
    /"version": "[^"]*"/,
    `"version": "${newVersion}"`,
  )

  await fs.writeFile(filePath, contents)
  console.log('Package version updated')
}

async function tagDocumentation(version: string) {
  const websitePath = path.join(__dirname, 'website')
  const versionedDocsPath = path.join(
    websitePath,
    'versioned_docs',
    `version-v${version}`,
  )

  if (existsSync(versionedDocsPath)) {
    console.log('Documentation already tagged')
    return
  }

  execSync(`npm run docusaurus docs:version v${version}`, {
    cwd: websitePath,
  })

  console.log('Documentation tagged')
}

async function updateDocusaurusConfig(newVersion: string) {
  const filePath = path.join(__dirname, 'website', 'docusaurus.config.ts')
  let contents = await fs.readFile(filePath, 'utf-8')

  contents = contents.replace(/'v(\d+\.\d+\.[^']*)'/g, `'v${newVersion}'`)

  await fs.writeFile(filePath, contents)
  console.log('Docusaurus config updated')
}

main()
