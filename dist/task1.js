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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeHorseOdds = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
function scrapeHorseOdds(eventUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch({
            headless: 'new',
        });
        const page = yield browser.newPage();
        yield page.goto(eventUrl);
        const scrapedData = yield page.$$('.runner-body');
        const horseData = [];
        if (scrapedData.length === 0) {
            throw new Error('Data could not be scraped. Here are a few reasons why: \n 1. Incorrect Url. \n 2. No css selector with given name found. \n 3. Race event may have finished.');
        }
        for (const horseElement of scrapedData) {
            const horseName = yield horseElement.$eval('.runner-name-value', (element) => element.textContent);
            const horseWinngingOdds = yield horseElement.$eval('.ui-runner-price', (element) => element.textContent);
            horseData.push({
                name: horseName,
                winningOdds: horseWinngingOdds,
            });
        }
        yield browser.close();
        return horseData;
    });
}
exports.scrapeHorseOdds = scrapeHorseOdds;
scrapeHorseOdds('https://www.betfair.com/sport/horse-racing/meeting?eventId=32697743&raceTime=1696868520000&dayToSearch=20231009&marketId=924.378841461');
//# sourceMappingURL=task1.js.map