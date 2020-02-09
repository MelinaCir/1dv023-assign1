/**
 * Cinema scraper module.
 *
 * @module lib/cinemaScraper.js
 * @author Melina Cirverius
 * @version 1.0.0
 */
'use strict'

// const { JSDOM } = require('jsdom')
const fetch = require('node-fetch')

/**
 * Gets the available movies.
 *
 * @param {string} url The link to check.
 */
async function getAvailableMovie (url) {
  try {
    const response = await fetch(url + '/check?day=05&movie=01')
    const data = await response.text()
    const text = JSON.parse(data)

    checkValue(data, '1')
    console.log(data)

    // console.log('Scraping showtimes...OK')
  } catch (error) {
    console.log('Error:', error)
  }
}

/**
 * Blabla.
 *
 * @param {*} json Bla.
 * @param {*} value Bla.
 * @returns {*} Function call.
 */
function checkValue (json, value) {
  for (const key in json) {
    if (typeof (json[key]) === 'object') {
      return checkValue(json[key], value)
    } else if (json[key] === value) {
      console.log('hello', json[key])
    }
  }
}
module.exports.getAvailableMovie = getAvailableMovie
