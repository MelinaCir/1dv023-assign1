'use strict'

const { JSDOM } = require('jsdom')
// const cheerio = require('cheerio')
const fetch = require('node-fetch')

const getLinks = async url => {
  const response = await fetch(url)
  const text = await response.text()
  const dom = await new JSDOM(text)

  return dom
}

module.exports.getLinks = getLinks
