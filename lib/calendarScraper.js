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

  const test = calendarDom.window.document.querySelector('table tr th:first-child')

  console.log(test.innerHTML)

  const dateArray = Array.from(calendarDom.window.document.querySelectorAll('table tr th:first-child'))

  console.log(dateArray[0])
  // for (const date in dateArray) {
  //   console.log(date.innerHTML)
  // }
}

module.exports.getAvailableDate = getAvailableDate
