/**
 * This is the starting point of the application.
 *
 * @author Melina Cirverius
 * @version 1.0.0
 */
'use strict'

const { getLinks } = require('./lib/scraper')
const { getAvailableDate } = require('./lib/calendarScraper')
const { getAvailableMovie } = require('./lib/cinemaScraper')
// const { getAvailableDinner } = require('./lib/dinnerScraper')

const args = process.argv.slice(2)

if (args.length === 0) {
  console.error('ERROR: No argument(s).')
  process.exit(0)
}

;(async () => {
  try {
    const linkPromise = getLinks(args)

    const [links] = await Promise.all([linkPromise])

    const linkArray = Array.from(new Set([...links]))

    console.log('Scraping links...OK')

    const days = await getAvailableDate(linkArray[0])

    getAvailableMovie(linkArray[1], days)

    // console.log('Recommendations')
    // console.log('===============')
    // console.log('* On ', date, ' the movie "', movie, '" starts at ', movieTime, ' and there is a free table between ', dinnerTime, '.')
  } catch (error) {
    console.log('Error: ', error)
  }
})()
