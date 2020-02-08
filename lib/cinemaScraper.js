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
// const { getLinks } = require('./scraper')

// const getAvailableMovie = async link => {
//   return console.log('')
//   'http://vhost3.lnu.se:20080/cinema/check?day=05&movie=01'
//   'http://vhost3.lnu.se:20080/cinema/check?day=06&movie=02'
// }
// const link = 'http://vhost3.lnu.se:20080/cinema/check?day=05&movie=01'
/**
 * Gets the available movies.
 *
 * @param {string} url The link to check.
 */
async function getAvailableMovie (url) {
  try {
    const response = await fetch(url + '/check?day=05&movie=01')
    const data = await response.text()
    console.log(data)
  } catch (error) {
    console.log('Error:', error)
  }
}
module.exports.getAvailableMovie = getAvailableMovie
