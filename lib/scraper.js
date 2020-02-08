/**
 * Scraper module.
 *
 * @module lib/scraper.js
 * @author Melina Cirverius
 * @version 1.0.0
 */
'use strict'

const { JSDOM } = require('jsdom')
const fetch = require('node-fetch')

/**
 * Get links from the starting url.
 *
 * @param {string} links The link to get information from.
 * @returns {Array} Array with the href elements.
 */
const getLinks = async links => {
  const response = await fetch(links)
  const text = await response.text()
  const dom = await new JSDOM(text)

  return Array.from(dom.window.document.querySelectorAll('a'), element => element.href)
}

module.exports.getLinks = getLinks
