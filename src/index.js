const express = require('express');
const cors = require('cors');
const redisRouter = require('./routers/redisRouter')

const app = express();
app.use(cors());
app.use(express.json());
app.use(redisRouter);

app.use('/', (req,res) => {
  res.send();
})

const port = process.env.PORT;
app.listen(port, () => console.log('Server listening on port ' + port))