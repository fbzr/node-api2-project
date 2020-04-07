const express = require('express');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors());

server.use('/api/posts', require('./routes/posts'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server lintening on port ${PORT}`));