'use strict'

// const { resolve } = require('path')
// const { readJson, writeJson } = require('fs-extra')
// const { getLinks } = require('./lib/scraper')
const fetch = require('node-fetch')
const { JSDOM } = require('jsdom')

// const url = 'http://vhost3.lnu.se:20080/weekend'

// ;(async () => {
//   try {
//     const linkPromises = await getLinks(url)
//     const [domResults] = await Promise.all([dom])
//   }
//   catch (error) {
//     console.log(error)
//   }
// })

;(async () => {
  try {
    const response = await fetch('http://vhost3.lnu.se:20080/weekend')
    const text = await response.text()
    const dom = await new JSDOM(text)
    console.log(dom.window.document.querySelectorAll('a[href^="http://"]'), element => element.href)
  } catch (error) {
    console.log(error)
  }
})()
