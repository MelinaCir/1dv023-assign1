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

const getAvailableDate = async url => {
  const linkPromise = await getLinks(url)

  const [links] = await Promise.all([linkPromise])

  const linkArray = Array.from(new Set([...links]))

  const availableDays = new Array(0)

  linkArray.forEach(async element => {
    const results = await checkDays(url + element)

    results.forEach(result => {
      availableDays.push(result)
    })
  })
}

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

module.exports.getAvailableDate = getAvailableDate
