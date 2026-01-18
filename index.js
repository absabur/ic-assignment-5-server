import jsonServer from 'json-server';
import path from 'path';
import cors from cors;
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  // This tells json-server NOT to crash if 'public' is missing
  static: './' 
});

const allowedOrigins = [
  'http://localhost:5173',          // Your local React (Vite) URL
  'https://ic-assignment-5.netlify.app'    // Your live React URL
];

// 2. Configure CORS options
const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// 3. Apply the middleware
server.use(cors(corsOptions));
const port = process.env.PORT || 3001;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});