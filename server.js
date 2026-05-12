const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const setupSecurity = require('./engines/guardian/security-config');
const setupAuctionSocket = require('./engines/market/auction-engine');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

setupSecurity(app);
setupAuctionSocket(io); // 경매 엔진 조립

app.use(express.json());
app.use('/api/market', require('./engines/market/index'));
app.use('/api/bio-axis', require('./engines/bio-axis/index'));
app.use('/api/admin', require('./common/admin/admin-routes'));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(\HEXIS Hyper-Core running on port \\));
