const mongoose = require('mongoose')

const databaseUrl =
  process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/argentBankDB'

module.exports = async () => {
  try {
    console.log('Tentative de connexion à :', databaseUrl)
    await mongoose.connect(databaseUrl)
    console.log('Database successfully connected')
  } catch (error) {
    console.error(`Database Connectivity Error: ${error}`)
    throw error
  }
}