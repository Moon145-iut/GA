import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;

// Serve static files from the current directory
app.use(express.static('./'));

// Serve index.html for all routes to handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`YouTube Clone Static Server running at http://localhost:${PORT}`);
  console.log(`Open your browser to view the application`);
});