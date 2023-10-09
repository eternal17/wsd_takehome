"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const task1_js_1 = require("./task1.js");
describe('scrapeHorseOdds', () => {
    it('should return an array of HorseData objects', () => __awaiter(void 0, void 0, void 0, function* () {
        const horseData = yield (0, task1_js_1.scrapeHorseOdds)('https://www.betfair.com/sport/horse-racing/meeting?eventId=32697743&raceTime=1696868520000&dayToSearch=20231009&marketId=924.378841461');
        expect(Array.isArray(horseData)).toBe(true);
        expect(horseData.length).toBeGreaterThan(0);
        expect(horseData[0]).toHaveProperty('name');
        expect(horseData[0]).toHaveProperty('winningOdds');
    }));
    it('should throw an error if no data is scraped', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, task1_js_1.scrapeHorseOdds)('https://www.betfair.com/sport/horse-racing/meeting?eventId=32697743&raceTime=1696863000000&dayToSearch=20231009&marketId=924.378841355')).rejects.toThrowError('Data could not be scraped. Here are a few reasons why: \n 1. Incorrect Url. \n 2. No css selector with given name found. \n 3. Race event may have finished.');
    }));
});
//# sourceMappingURL=task1.test.js.map