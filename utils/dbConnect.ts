import mongoose, { ConnectionOptions } from 'mongoose'

interface Connection extends ConnectionOptions {
  isConnected?: boolean
}

const connection: Connection = {}

async function dbConnect() {
  // eslint-disable-next-line
  console.log('Using existing connection')
  if (connection.isConnected) {
    return
  }

  const db = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })

  connection.isConnected = !!db.connections[0].readyState
  // eslint-disable-next-line
  console.log('DB Connected')
}

export default dbConnect
