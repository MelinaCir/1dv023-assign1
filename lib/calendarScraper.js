/**
 * Calendar scraper module.
 *
 * @module lib/calendarScraper.js
 * @author Melina Cirverius
 * @version 1.0.0
 */
'use strict'

const { JSDOM } = require('jsdom')
const fetch = require('node-fetch')
const { getLinks } = require('./scraper')

/**
 * Gets the available days from all calenders.
 *
 * @param {string} url The url for the calender.
 */
const getAvailableDate = async url => {
  const linkPromise = await getLinks(url)

  const [links] = await Promise.all([linkPromise])

  const linkArray = Array.from(new Set([...links]))

  const availableDays = new Array(0)

  for (let i = 0; i < linkArray.length; i++) {
    const results = await checkDays(url + linkArray[i])

    for (let j = 0; j < results.length; j++) {
      availableDays.push(results[j])
    }
  }

  syncCalendars(availableDays)
  console.log('Scraping available days...OK')
}

/**
 * Goes through each of the people's calendar and finds their available days.
 *
 * @param {string} calendar The link to the current calendar.
 */
const checkDays = async calendar => {
  const response = await fetch(calendar)
  const text = await response.text()
  const calendarDom = await new JSDOM(text)

  const days = calendarDom.window.document.querySelectorAll('table tr th')
  const available = calendarDom.window.document.querySelectorAll('table tr td')
  const dateArray = new Array(0)

  for (let i = 0; i < days.length; i++) {
    if (available[i].innerHTML === 'ok' || available[i].innerHTML === 'OK') {
      const day = days[i].innerHTML
      dateArray.push(day)
    }
  }
  return dateArray
}

/**
 * Checks if there is a day that is available for all calendars.
 *
 * @param {Array} dayArray The array of days to be checked.
 * @returns {Array} The array of available days.
 */
function syncCalendars (dayArray) {
  const occurences = {}
  for (let i = 0; i < dayArray.length; i++) {
    occurences[dayArray[i]] = (occurences[dayArray[i]] || 0) + 1
  }

  const freeDays = Array(0)
  if (occurences.Friday === 3) {
    freeDays.push('Friday')
  } else if (occurences.Saturday === 3) {
    freeDays.push('Saturday')
  } else if (occurences.Sunday === 3) {
    freeDays.push('Sunday')
  }
  return freeDays
}

module.exports.getAvailableDate = getAvailableDate
