/**
 * Cinema scraper module.
 *
 * @module lib/cinemaScraper.js
 * @author Melina Cirverius
 * @version 1.0.0
 */
'use strict'

const fetch = require('node-fetch')

/**
 * Gets the available movies.
 *
 * @param {string} url The link to check.
 * @param {Array} days The available days to check.
 * @returns {Array} Returns an array of the available movies.
 */
async function getAvailableMovie (url, days) {
  try {
    const availableMovies = Array(0)

    for (let i = 0; i < days.length; i++) {
      if (days[i] === 'Friday') {
        availableMovies.push(await checkMovies(url, '05'))
      } else if (days[i] === 'Saturday') {
        availableMovies.push(await checkMovies(url, '06'))
      } else if (days[i] === 'Sunday') {
        availableMovies.push(await checkMovies(url, '07'))
      }
    }

    console.log('Scraping showtimes...OK')
    return availableMovies
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
  const result = Array(0)
  while (count < 4) {
    const response = await fetch(url + '/check?day=' + day + '&movie=0' + count)
    data = await response.json()

    count++
    const available = checkValue(data, 1)
    result.push(available)
  }
  return result
}

/**
 * Checks the value of the json object and returns the available movies.
 *
 * @param {string} json The Json data.
 * @param {string} value The value to check for.
 * @returns {JSON} Returns the json object of the movie.
 */
function checkValue (json, value) {
  for (const key in json) {
    if (typeof (json[key].status) === 'object') {
      return checkValue(json[key], value)
    } else if (json[key].status === value) {
      const movieTime = json[key]
      if (movieTime.movie === '01') {
        movieTime.movie = 'The Flying Deuces'
      } else if (movieTime.movie === '02') {
        movieTime.movie = 'Keep Your Seats, Please'
      } else if (movieTime.movie === '03') {
        movieTime.movie = 'A Day at the Races'
      }
      return movieTime
    }
  }
}

// Exports module
module.exports.getAvailableMovie = getAvailableMovie
