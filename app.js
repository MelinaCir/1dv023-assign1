/**
 * This is the starting point of the application.
 *
 * @author Melina Cirverius
 * @version 1.0.0
 */
'use strict'

const { getLinks } = require('./lib/scraper')

;(async () => {
  try {
    const url = 'http://vhost3.lnu.se:20080/weekend'

    const linkPromise = getLinks(url)

    const [links] = await Promise.all([linkPromise])

    const linksSet = new Set([...links])

    console.log(linksSet)
  } catch (error) {
    console.log(error)
  }
})()
