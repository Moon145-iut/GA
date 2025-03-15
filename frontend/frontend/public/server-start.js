// Wrapper script to run serve-static.js
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Start the static server
console.log('Starting YouTube Clone Static Server...');
const server = spawn('node', [join(__dirname, 'serve-static.js')], {
  stdio: 'inherit'
});

server.on('error', (error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.kill('SIGINT');
  process.exit(0);
});