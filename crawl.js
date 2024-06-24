const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currentURL, pages) {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);

  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  const normalizedCurrentURL = normalizeURL(currentURL);
  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages;
  }

  pages[normalizedCurrentURL] = 1;

  console.log(`Starting crawl of ${currentURL}`);

  try {
    const res = await fetch(currentURL);

    if (res.status > 399) {
      console.log(
        `error in fetch with status code: ${res.status}, on page: ${currentURL}`
      );
      return pages;
    }

    const contentType = res.headers.get("content-type").slice(0, 9);
    if (contentType !== "text/html") {
      console.log(
        `error non html content type ${contentType}, on page: ${currentURL}`
      );
      return pages;
    }

    const htmlBody = await res.text();

    const nextURLs = getURLsFromHTML(htmlBody, baseURL);

    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages);
    }
  } catch (err) {
    console.log(`error in fetch: ${err.message}, on page: ${currentURL}`);
  }

  return pages;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);

  const linkedURL = dom.window.document.querySelectorAll("a");

  for (const link of linkedURL) {
    let url = link.href;

    if (url.startsWith("/")) {
      try {
        urls.push(new URL(url, baseURL).href);
      } catch (error) {
        console.log(`Their is an Error ${error.message}`);
      }
    } else {
      try {
        urls.push(new URL(url).href);
      } catch (error) {
        console.log(`Their is an Error ${error.message}`);
      }
    }
  }

  return urls;
}

function normalizeURL(url) {
  const objurl = new URL(url);
  const hosturl = `${objurl.hostname}${objurl.pathname}`;

  if (hosturl.length > 0 && hosturl.slice(-1) === "/") {
    return hosturl.slice(0, -1);
  }

  return hosturl;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
