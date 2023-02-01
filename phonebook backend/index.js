require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Human = require('./models/human');

const app = express();
app.use(express.json());
app.use(cors());

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/info', (req, res) => {
  Human.estimatedDocumentCount({}, (err, connt) => {
    const send = `
        <p>Phonebook has info for ${connt} people</p>
        <p>${new Date().toString()}</p>
        `;

    res.send(send);
  });
});

app.get('/api/persons', (req, res, next) => {
  Human.find({}).then((result) => {
    res.json(result);
  }).catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const person = request.body;

  if (!person.name || !person.number) {
    return response.status(400).json({
      error: 'name or number missing',
    });
  }

  const human = new Human({
    name: person.name,
    number: person.number,
  });

  human.save().then((result) => {
    response.send(result);
  }).catch((error) => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
  Human.findById(req.params.id).then((result) => {
    if (result) {
      res.send(result);
    } else {
      res.status(404).end();
    }
  }).catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const human = {
    name: request.body.name,
    number: request.body.number,
  };

  Human.findByIdAndUpdate(request.params.id, human, { new: true })
    .then((result) => {
      response.json(result);
    }).catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Human.findByIdAndRemove(request.params.id).then((result) => {
    response.status(204).end();
  }).catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  if (error.name === 'ValidationError') {
    return response.status(400).send(error.message);
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
