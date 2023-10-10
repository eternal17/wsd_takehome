import puppeteer from 'puppeteer';

export interface HorseData {
  name: string | null;
  winningOdds: string | null;
}

// Async function that returns an array of HorseData objects.
// asumming that a valid url is provided.
export async function scrapeHorseOdds(eventUrl: string): Promise<HorseData[]> {
  // launches a browser using puppeteer
  const browser = await puppeteer.launch({
    headless: 'new',
  });

  // open new page in the browser
  const page = await browser.newPage();

  // navigate to page url
  await page.goto(eventUrl);

  // scrape the neccessary data.

  const scrapedData = await page.$$('.runner-body');

  // initialise an empty array for the horse data
  const horseData: HorseData[] = [];

  // if there is no scraped data, return an empty array
  if (scrapedData.length === 0) {
    return [];
  }

  // loop through scraped data
  for (const horseElement of scrapedData) {
    // find the selector for the name
    const horseName: string | null = await horseElement.$eval(
      '.runner-name-value',
      (element) => element.textContent
    );

    // find the selector for the odds
    const horseWinngingOdds: string | null = await horseElement.$eval(
      '.ui-runner-price',
      (element) => element.textContent
    );

    // push data into object
    horseData.push({
      name: horseName,
      winningOdds: horseWinngingOdds,
    });
  }
  // close the browser.
  await browser.close();
  // return the data
  return horseData;
}

// example usage of the function usage

const url =
  'https://www.betfair.com/sport/horse-racing/meeting?eventId=32704217&raceTime=1696962480000&dayToSearch=20231010&marketId=924.379071852';

scrapeHorseOdds(url).then((data) => {
  if (data.length > 0) {
    console.log('Scraped horse odds', data);
  } else {
    console.log('No data found');
  }
});
