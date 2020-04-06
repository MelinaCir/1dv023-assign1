/**
 * Dinner scraper module.
 *
 * @module lib/dinnerScraper.js
 * @author Melina Cirverius
 * @version 1.0.0
 */
'use strict'

// const { JSDOM } = require('jsdom')
const fetch = require('node-fetch')
// const { getLinks } = require('./scraper')

/**
 * Gets the available dinner reservation times.
 *
 * @param {*} link The url to check.
 * @param {*} movieTimes The movie times to match reservation to.
 */
async function getAvailableDinner (link, movieTimes) {
  try {
    const response = await fetch(link)
    const data = await response.text()

    console.log(data)
    // console.log('Scraping possible reservations...OK')
    return console.log('')
  } catch (error) {
    console.log('Error:', error)
  }
}

// Exports module
module.exports.getAvailableDinner = getAvailableDinner
