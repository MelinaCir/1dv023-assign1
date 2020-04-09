/**
 * Dinner scraper module.
 *
 * @module lib/dinnerScraper.js
 * @author Melina Cirverius
 * @version 1.0.0
 */
'use strict'

// Tror även du ska skicka med en user: xxx, pass: xxx, submit: 'submit' Spana in trafiken när du loggar in
// Räckte att skicka med 'username=zeke&password=coys' i bodyn

// const { JSDOM } = require('jsdom')
const fetch = require('node-fetch')
const fetchCookie = require('fetch-cookie/node-fetch')(fetch)
// const cheerio = require('cheerio')

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
    console.log(bookings)

    // console.log('Scraping possible reservations...OK')
    return console.log('')
  } catch (error) {
    console.log('Error:', error)
  }
}

// Exports module
module.exports.getAvailableDinner = getAvailableDinner
