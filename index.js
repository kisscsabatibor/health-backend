import express from 'express'
import { config } from 'dotenv'
import { MongoClient } from 'mongodb'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, async () => {
  config()
  const uri = process.env.DB_URI
  let mongoClient

  try {
    mongoClient = await connectToCluster(uri)
  } finally {
    await mongoClient.close()
  }
  console.log(`Example app listening on port ${port}`)
})

export async function connectToCluster(uri) {
  let mongoClient

  try {
    mongoClient = new MongoClient(uri)
    console.log('Connecting to MongoDB Atlas cluster...')
    await mongoClient.connect()
    console.log('Successfully connected to MongoDB Atlas!')

    return mongoClient
  } catch (error) {
    console.error('Connection to MongoDB Atlas failed!', error)
    process.exit()
  }
}
