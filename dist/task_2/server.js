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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const scrapeOdds_1 = require("../task_1/scrapeOdds");
exports.app = (0, express_1.default)();
const port = 8080;
exports.app.use(express_1.default.json());
const secretKey = 'encryptedSecretKey';
const authToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        return res.status(401).send('Unauthorized');
    jsonwebtoken_1.default.verify(token, secretKey, (err, user) => {
        if (err)
            return res.status(403).send('Token not valid');
        req.user = user;
        next();
    });
};
exports.app.post('/login', (req, res) => {
    const user = { name: req.body.name, password: req.body.password };
    if (!user.name || !user.password) {
        return res.status(401).send('Provide a username and password');
    }
    if (user.name === 'admin' && user.password === 'password') {
        const token = jsonwebtoken_1.default.sign(user, secretKey);
        res.json({ token: token });
    }
    else {
        res.status(401).send('Incorrect username or password');
    }
});
exports.app.post('/odds', authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventUrl = req.body.eventUrl;
    if (!eventUrl)
        return res.status(401).send('provide a url to get the odds');
    const odds = yield (0, scrapeOdds_1.scrapeHorseOdds)(eventUrl);
    if (odds.length === 0)
        return res
            .status(404)
            .send('no odds found, ensure correct url is provided');
    res.json({ odds: odds });
}));
exports.app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
//# sourceMappingURL=server.js.map