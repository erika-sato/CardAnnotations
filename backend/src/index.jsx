const express = require('express')
const routes = require('./routes.jsx')
const cors = require('cors')

const app = express()
require('./config/dbConfig.jsx')

app.use(cors())
app.use(express.json())
app.use(routes)


app.listen(3333)