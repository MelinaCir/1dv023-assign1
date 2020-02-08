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

  checkDays(url + linkArray[0])
  // linkArray.forEach(element => {
  //   console.log('element: ', element)
  //   checkDays(element)
  // })
}

const checkDays = async calendar => {
  const response = await fetch(calendar)
  const text = await response.text()
  const calendarDom = await new JSDOM(text)

  const days = calendarDom.window.document.querySelectorAll('table tr th')
  const available = calendarDom.window.document.querySelectorAll('table tr td')

  for (let i = 0; i < days.length; i++) {
    if (available[i].innerHTML === 'ok' || available[i].innerHTML === 'OK') {
      console.log(days[i].innerHTML)
    }
  }
}

module.exports.getAvailableDate = getAvailableDate
