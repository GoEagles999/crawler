
const axios = require('axios')
const entryPoint = process.argv[2]

const staticAssets = []
const urls = []
// match every <img> tag in order to extract value of 'src' property
const imgTag = new RegExp('<img','gi')
// match every <a> tag in order to extract value of 'href' propery
const anchorTag = new RegExp('<a','gi') 
const hrefAttr = new RegExp('href', 'gi')
const srcAttr = new RegExp('src', 'gi')
// placeholder for storing position of matched DOM node
let result 

const crawl = async url => {
    // holds DOM as string
    let document
    try {
        document = await axios.get(url)
        document = document.data
    } catch (e) {
        console.log(`Error occured fetching ${url}'s resources`, e)
    }
    while(result = imgTag.exec(document)) {
        // assume 'src' property of <img> tag is in the next 200 characters
        // TODO: check if there is a /> string marking end of img tag
        // TODO: construct another RegExp object and search for the closing tag in candidate to get its' position
        const candidate = document.substr(result.index, 200)
        // copy every character into an array
        const split = candidate.split('')
        const positions = []
        split.forEach((char, i) => {
            if (char == "'" || char == '"') {
                // store position of all " or ' characters in the candidate string
                positions.push(i)
            }
        })
        positions.forEach((position, i) => {
            // if the character before the occurence ' or " by position 3 is 'c' that means we found the sr*c* attribute
            if (candidate[position-2] == 'c' && candidate[position-3] == 'r') {
                // this position has an src attribute, get ready for extraction of the value!
                const beginPositionForValue = positions[i]
                // the next " or ' character marks end of the value
                const endPositionForValue = positions[i+1]
                // we have the href value
                const srcvalue = candidate.substr(beginPositionForValue, endPositionForValue)
                staticAssets.push(srcvalue)
            }
        })
    }
    while(result = anchorTag.exec(document)) {
        // assume 'href' property of <img> tag is in the next 200 characters
        // TODO: check if there is a /> string marking end of img tag
        // TODO: construct another RegExp object and search for the closing tag in candidate to get its; position
        const candidate = document.substr(result.index, 200)
        // copy every character into an array
        const split = candidate.split('')
        const positions = []
        split.forEach((char, i) => {
            if (char == "'" || char == '"') {
                // store position of all " or ' characters in the candidate string
                positions.push(i)
            }
        })
        positions.forEach((position, i) => {
            // if the character before the occurence ' or " by position 3 is 'f' that means we found the hre*f* attribute
            if (candidate[position-2] == 'f' && candidate[position-3] == 'e') {
                // this position has a href attribute, get ready for extraction of the value!
                const beginPositionForValue = positions[i]
                // the next " or ' character marks end of the value
                const endPositionForValue = positions[i+1]
                // we have the href value
                const hrefvalue = candidate.substr(beginPositionForValue, endPositionForValue)
                urls.push(hrefvalue)
            }
        })
    }
    // TODO repeat the crawling process for each page
    // from root resource on host
    urls.forEach(url => {
        crawl(url)
    })
} 

crawl(`https://${entryPoint}`)

// TODO delete duplicates in array
console.log(`Plain text: \n ${urls.join('\n')}`)
// TODO generate XML
console.log(`XML: \n`)
