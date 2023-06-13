const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('connected to DB')
  } catch (err) {
    console.log(err)
  }
}

connection()

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (number) =>
        (number[2] === '-' || number[3] === '-') &&
        !number.slice(4).includes('-'),
      message:
        'Please enter phone number in a valid format for ex: 12-899889.. or 123-298498..',
    },
  },
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Contact', contactSchema)
