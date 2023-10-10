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
const server_1 = require("./server");
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = 'encryptedSecretKey';
describe('POST /login', () => {
    test('should return 200 and token for valid username and password', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app)
            .post('/login')
            .send({ name: 'admin', password: 'password' });
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    }));
});
describe('POST /odds', () => {
    test('should return 401 if missing token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app)
            .post('/odds')
            .send({ eventUrl: 'https://notokenprovided.com' });
        expect(response.status).toBe(401);
    }));
    test('should return 404 if odds could not be scraped from given url', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = { name: 'admin', password: 'password' };
        const token = jsonwebtoken_1.default.sign(user, secretKey);
        const response = yield (0, supertest_1.default)(server_1.app)
            .post('/odds')
            .set('Authorization', `Bearer ${token}`)
            .send({
            eventUrl: 'https://www.betfair.com/sport/horse-racing/meeting?eventId=32700712&raceTime=1696941420000&dayToSearch=20231010&marketId=924.378972469',
        });
        expect(response.status).toBe(404);
    }));
});
//# sourceMappingURL=server.test.js.map