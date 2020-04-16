const path = require('path')
const { fork } = require('child_process')
const puppeteer = require('puppeteer')
const process = require('process')

fork(path.join(__dirname, './staticServer.js'));

(async () => {
  const browser = await puppeteer.launch({
    headless: true
  })
  const page = await browser.newPage()
  await page.goto('http://localhost:9292/#/pdf')
  await page.pdf({ path: path.join(__dirname, './public/张潇的简历.pdf'), format: 'A4' })

  await browser.close()

  process.exit()
})()
