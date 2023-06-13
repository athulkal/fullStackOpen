const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://athulsocialxyz:${password}@cluster0.n1xadlp.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

const connection = async () => {
  try {
    await mongoose.connect(url)
    if (process.argv.length === 3)
      Contact.find({}).then((result) => {
        console.log('Phonebook')
        result.forEach((contact) => {
          console.log(`${contact.name} ${contact.number}`)
        })
        mongoose.connection.close()
      })
    else if (process.argv.length > 3) {
      const contact = new Contact({
        name: process.argv[3],
        number: process.argv[4],
      })
      contact.save().then((res) => {
        console.log('contact saved!', res)
        mongoose.connection.close()
      })
    }
  } catch (err) {
    console.log(err)
  }
}

connection()

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)
