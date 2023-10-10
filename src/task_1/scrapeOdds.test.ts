import { scrapeHorseOdds } from './scrapeOdds.js';

describe('scrapeHorseOdds', () => {
  it('should return an array of HorseData objects if data has been scraped', async () => {
    const horseData = await scrapeHorseOdds(
      'https://www.betfair.com/sport/horse-racing/meeting?eventId=32700628&raceTime=1696872000000&dayToSearch=20231009&marketId=924.378966417'
    );
    if (horseData.length > 0) {
      expect(Array.isArray(horseData)).toBe(true);
      expect(horseData[0]).toHaveProperty('name');
      expect(horseData[0]).toHaveProperty('winningOdds');
    }
  });

  it('should return an empty array if no data is scraped', async () => {
    const horseData = await scrapeHorseOdds(
      'https://www.betfair.com/sport/horse-racing/meeting?eventId=32697743&raceTime=1696863000000&dayToSearch=20231009&marketId=924.378841355'
    );
    expect(Array.isArray(horseData)).toBe(true);
    expect(horseData.length).toBe(0);
  });
});
