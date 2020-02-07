/**
 * Scraper module.
 *
 * @module lib/scraper.js
 * @author Melina Cirverius
 * @version 1.0.0
 */
'use strict'

const { JSDOM } = require('jsdom')
const fetch = require('node-fetch')
// const express = require('express')
// const request = require('request')
// const cheerio = require('cheerio')

const getLinks = async links => {
  const response = await fetch('http://vhost3.lnu.se:20080/weekend')
  const text = await response.text()
  const dom = await new JSDOM(text)

  return Array.from(dom.window.document.querySelectorAll('a[href^="http://"]'), element => element.href)
}

const getText = async url => {
  const response = await fetch(url)
  return response.text()
}

module.exports.getLinks = getLinks
module.exports.getText = getText
