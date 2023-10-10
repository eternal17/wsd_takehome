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
const scrapeOdds_js_1 = require("./scrapeOdds.js");
describe('scrapeHorseOdds', () => {
    it('should return an array of HorseData objects', () => __awaiter(void 0, void 0, void 0, function* () {
        const horseData = yield (0, scrapeOdds_js_1.scrapeHorseOdds)('https://www.betfair.com/sport/horse-racing/meeting?eventId=32700628&raceTime=1696872000000&dayToSearch=20231009&marketId=924.378966417');
        expect(Array.isArray(horseData)).toBe(true);
        expect(horseData.length).toBeGreaterThan(0);
        expect(horseData[0]).toHaveProperty('name');
        expect(horseData[0]).toHaveProperty('winningOdds');
    }));
    it('should return an empty array if no data is scraped', () => __awaiter(void 0, void 0, void 0, function* () {
        const horseData = yield (0, scrapeOdds_js_1.scrapeHorseOdds)('https://www.betfair.com/sport/horse-racing/meeting?eventId=32697743&raceTime=1696863000000&dayToSearch=20231009&marketId=924.378841355');
        expect(Array.isArray(horseData)).toBe(true);
        expect(horseData.length).toBe(0);
    }));
});
//# sourceMappingURL=scrapeOdds.test.js.map