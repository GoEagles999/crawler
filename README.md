# crawler
I ran out of time

# How it works
This crawler is implemented in Node.js and traverses the DOM looking for the following elements:
- anchor tags (<a href='asd' />)
- img tags (<img src='asd' />)

# Tradeoffs made
When crawling pages it does not look for redirects implemented in JavaScript code ie assignment statements to document.href or window.location object, or jQuery code. In addition, sites may contain self-closing or not self-closing tags. The crawler supports self-closing image and anchor tags only.

# How to build
Run 'npm install' in root directory 

# How to run 
Run crawler with Node.js v10 on a domain: npm start wipro.com
Run unit tests: npm run test