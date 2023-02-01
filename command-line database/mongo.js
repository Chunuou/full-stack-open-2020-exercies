const mongoose = require('mongoose')

const password = 'fZfoQ5WomrRK2Jlg';
// const password = process.argv[2];

const url = ``
// const url = ``;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const humanSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Human = mongoose.model('Human', humanSchema);

const length = process.argv.length;

if (length === 3) {
    Human.find({}).then((result) => {
        console.log('phonebook:');
        result.forEach(human => {
            console.log(human.name, human.number);
        })

        mongoose.connection.close();
    })
}

if (length === 5) {
    const name = process.argv[3];
    const number = process.argv[4];

    const human = new Human({
        name,
        number,
    });

    human.save().then(result => {
        console.log(`added ${result.name} numbr ${result.number} to phonebook`);

        mongoose.connection.close();
    });
}
