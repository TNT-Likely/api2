import Waterline from 'waterline'
import sailsMemoryAdapter from 'sails-mongo'
import model from '../tools/model'

async function init() {
  // Create the waterline instance.
  let waterline = new Waterline()

  //get model definition
  let models = await model()

  //foreach modek definition
  models.forEach(i => {
    waterline.loadCollection(Waterline.Collection.extend(i))
  })

  // Set up the storage configuration for waterline.
  let config = {
    adapters: {
      'memory': sailsMemoryAdapter
    },

    connections: {
      default: {
        adapter: 'memory'
      }
    }
  };

  // Initialise the waterline instance.
  waterline.initialize(config, function(err, ontology) {
    if (err) {
      return console.error(err);
    }

    // Tease out fully initialised models.
    var User = ontology.collections.user;
    var Pet = ontology.collections.pet;

    // First we create a user.
    User.create({
        firstName: 'Neil',
        lastName: 'Armstrong'
      })
      .then(function(user) {
        // Then we can create a pet for the user.
        // Note that waterline automatically adds the `id` primary key to the model.
        Pet.create({
            breed: 'beagle',
            type: 'dog',
            name: 'Astro',
            owner: user.id
          })
          .then(function(pet) {
            // Then we can associate the pet with the user.
            user.pets = [pet];

            // And save the user.
            return user.save();
          })
          .then(function() {
            // And now we want to get the new user back,
            // and populate the pets the user might own.
            return User.find()
              .populate('pets');
          })
          .then(console.log)
          .catch(console.error);
      });
  });
}


export default init
