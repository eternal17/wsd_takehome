import { scrapeHorseOdds } from './task1.js';

describe('scrapeHorseOdds', () => {
  it('should return an array of HorseData objects', async () => {
    const horseData = await scrapeHorseOdds(
      'https://www.betfair.com/sport/horse-racing/meeting?eventId=32697743&raceTime=1696868520000&dayToSearch=20231009&marketId=924.378841461'
    );
    expect(Array.isArray(horseData)).toBe(true);
    expect(horseData.length).toBeGreaterThan(0);
    expect(horseData[0]).toHaveProperty('name');
    expect(horseData[0]).toHaveProperty('winningOdds');
  });

  it('should throw an error if no data is scraped', async () => {
    await expect(
      scrapeHorseOdds(
        'https://www.betfair.com/sport/horse-racing/meeting?eventId=32697743&raceTime=1696863000000&dayToSearch=20231009&marketId=924.378841355'
      )
    ).rejects.toThrowError(
      'Data could not be scraped. Here are a few reasons why: \n 1. Incorrect Url. \n 2. No css selector with given name found. \n 3. Race event may have finished.'
    );
  });
});
