const mongoose = require('mongoose')

const numArgs = process.argv.length;

if (numArgs < 3) {
    console.log('give password as argument')
    process.exit(1)
} else if (numArgs > 5 || numArgs === 4) {
    console.log('wrong number of arguments. Please provide the password, then optionally a name and number')
    process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://nexumos:${password}@cluster0.vdyhpeh.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (numArgs === 3) {
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()
      })
} else if (numArgs === 5) {
    const name = process.argv[3];
    const number = process.argv[4];
    const person = new Person({
        name,
        number
      })

    person.save().then(result => {
        console.log(`added ${name} with number ${number} to the phonebook`)
        mongoose.connection.close()
      })
}