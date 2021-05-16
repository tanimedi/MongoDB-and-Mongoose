require('dotenv').config();

const uri = process.env['MONGO_URI'];
const mongoose = require('mongoose');
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

var Schema = mongoose.Schema;
let personSchema = new Schema({
  name : {type: String, required: true},
  age : Number,
  favoriteFoods : [String]
});

let Person = mongoose.model('Person', personSchema);

/*let Bob = new Person({
  name: "Bob",
  age: 100,
  favoriteFoods: ["Pizza", "Sushi"]
});
*/

/*var createAndSavePerson = function(done) {
  var janeFonda = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});

  janeFonda.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};
*/
const createAndSavePerson = function(done) {
let jake = new Person({
  name: 'Jake',
  age: 21,
  favoriteFoods : ['bacon', 'burger']
  });

jake.save(function(err, data) {
  if(err) {
    done(err);}
    done (null, data);
});
};

let arrayOfPeople = [
  {name: "Sam", age: 34, favoriteFoods: ["chicken"]},
  {name: "Evan", age: 26, favoriteFoods: ["mango"]},
  {name: "Pearl", age: 58, favoriteFoods: ["eggs"]}
];

var createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};


var findPeopleByName = function(personName, done) {
  Person.find({name: personName}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

var findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

var findPersonById = function(personId, done) {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';


  Person.findById(personId, (err, person) => {
    if(err) return console.log(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

var findAndUpdate = function(personName, done) {
  var ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { $set: { age: ageToSet } },
    { new: true },
    (err, data) => {
      if (err) return console.log(err);
      done(null, data);
    }
  );
};

var removeById = function(personId, done) {
  Person.findByIdAndRemove({ _id: personId }, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

var removeManyPeople = function(done) {
  var nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

var queryChain = function(done) {
  var foodToSearch = "eggs";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 'asc' })
    .limit(2)
    .select('-age'})
    .exec((err, filteredResults) => {
      if (err) {
        console.log(err)
      }else{
      done(null, filteredResults);
    }
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
