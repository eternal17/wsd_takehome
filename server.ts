import express, { Application, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { scrapeHorseOdds } from './scrapeOdds';

const app: Application = express();

const port = 8080;

app.use(express.json());
const secretKey = 'encryptedSecretKey';

interface AuthRequest extends Request {
  user?: string | object | undefined;
}

// http middleware - taking out the token and verifying it.
const authToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  // split to get the token as the first part of the string is 'Bearer'
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).send('Unauthorized');

  // verify the token
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).send('Token not valid');

    req.user = user;
    next();
  });
};

// assuming here that the user has an account and they are logging in to get a token
app.post('/login', (req: Request, res: Response) => {
  // authenticate the user
  const user = { name: req.body.name, password: req.body.password };

  if (!user.name || !user.password) {
    return res.status(401).send('Provide a username and password');
  }

  if (user.name === 'admin' && user.password === 'password') {
    // create a token
    const token = jwt.sign(user, secretKey);
    res.json({ token: token });
    // res.json({ message: 'correct info' });
  } else {
    res.status(401).send('Incorrect username or password');
  }
});

/* enter the token in the header, and url to get the odds. 
If successful, return the odds using the function from task 1 */
app.post('/odds', authToken, async (req: Request, res: Response) => {
  const eventUrl = req.body.eventUrl;

  if (!eventUrl) return res.status(401).send('provide a url to get the odds');

  const odds = await scrapeHorseOdds(eventUrl);
  if (odds.length === 0)
    return res
      .status(401)
      .send('no odds found, ensure correct url is provided');
  res.json({ odds: odds });
});

app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
