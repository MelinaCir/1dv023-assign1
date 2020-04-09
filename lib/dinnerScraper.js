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
const fetchCookie = require('fetch-cookie/node-fetch')(fetch)
const cheerio = require('cheerio')

/**
 * Gets the available dinner reservation times.
 *
 * @param {*} link The url to check.
 * @param {*} movieTimes The movie times to match reservation to.
 */
async function getAvailableDinner (link, movieTimes) {
  try {
    const response = await fetchCookie(`${link}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'username=zeke&password=coys'
    })

    const bookings = await response.text()
    const body = cheerio.load(bookings)
    const availableTimes = new Array(0)

    body('.MsoNormal input').each((index, element) => {
      if (body(element).attr('value')) {
        availableTimes.push(body(element).attr('value'))
      }
    })
    movieTimes.forEach(movieTime => {
      availableTimes.forEach(dinnerTime => {
        const day = dinnerTime.slice(0, 3)
        const startTime = parseInt(dinnerTime.slice(3, 5))
        // const finishTime = dinnerTime.slice(5, 7)

        if (movieTime.day === '05' && day === 'fri') {
          if (parseInt(movieTime.time) + 2 === startTime) {
            console.log(startTime)
          }
        } else if (movieTime.day === '06' && day === 'sat') {
          console.log('Saturday')
        } else if (movieTime.day === '07' && day === 'sun') {
          console.log('Sunday')
        }
      })
    })

    // console.log('Scraping possible reservations...OK')
    return console.log('')
  } catch (error) {
    console.log('Error:', error)
  }
}

// Exports module
module.exports.getAvailableDinner = getAvailableDinner
