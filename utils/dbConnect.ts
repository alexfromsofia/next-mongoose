import mongoose, { ConnectionOptions } from 'mongoose'

interface Connection extends ConnectionOptions {
  isConnected?: boolean
}

const connection: Connection = {}

async function dbConnect() {
  if (connection.isConnected) {
    return
  }

  const db = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    bufferCommands: false,
    bufferMaxEntries: 0,
    useUnifiedTopology: true,
  })

  connection.isConnected = !!db.connections[0].readyState
  // eslint-disable-next-line
  console.log(connection.isConnected)
}

export default dbConnect
