/**
 * Cinema scraper module.
 *
 * @module lib/cinemaScraper.js
 * @author Melina Cirverius
 * @version 1.0.0
 */
'use strict'

const { JSDOM } = require('jsdom')
const fetch = require('node-fetch')

/**
 * Gets the available movies.
 *
 * @param {string} url The link to check.
 * @param {Array} days The available days to check.
 */
async function getAvailableMovie (url, days) {
  try {
    for (let i = 0; i < days.length; i++) {
      console.log(days[i])
      if (days[i] === 'Friday') {
        checkMovies(url, '05')
      } else if (days[i] === 'Saturday') {
        checkMovies(url, '06')
      } else if (days[i] === 'Sunday') {
        checkMovies(url, '07')
      }
    }

    // console.log('Scraping showtimes...OK')
  } catch (error) {
    console.log('Error:', error)
  }
}

/**
 * Check available movies for each day.
 *
 * @param {string} url The url to check.
 * @param {string} day The day to be checked.
 */
async function checkMovies (url, day) {
  let count = 1
  let data
  while (count < 4) {
    const response = await fetch(url + '/check?day=' + day + '&movie=0' + count)
    data = await response.json()

    count++
    checkValue(data, 1)
  }
}

/**
 * Checks the value of the json object.
 *
 * @param {string} json The Json data.
 * @param {string} value The value to check for.
 * @returns {Function} Calls function again.
 */
function checkValue (json, value) {
  for (const key in json) {
    if (typeof (json[key].status) === 'object') {
      return checkValue(json[key], value)
    } else if (json[key].status === value) {
      console.log(json[key].day, json[key].time, json[key].movie)
    }
  }
}

// Exports m
module.exports.getAvailableMovie = getAvailableMovie
