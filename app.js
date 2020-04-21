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
const { getAvailableDinner } = require('./lib/dinnerScraper')

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

    const movies = await getAvailableMovie(linkArray[1], days)

    const dinner = await getAvailableDinner(linkArray[2], movies)

    console.log('\n\nRecommendations')
    console.log('===============')

    if (days.length < 1) {
      console.log('No day available for everyone involved!')
    } else {
      dinner.forEach(result => {
        console.log('* On ' + result.day + ' the movie "' + result.movie + '" starts at ' + result.time +
         ' and there is a free table between ' + result.dinnerStart + ':00-' + result.dinnerEnd + ':00.')
      })
    }
  } catch (error) {
    console.log('Error: ', error)
  }
})()
