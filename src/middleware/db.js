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
  let dbConfig = {
    adapters: {
      'memory': sailsMemoryAdapter
    },

    connections: {
      default: Object.assign({
        adapter: 'memory'
      }, config.db)
    }
  }

  // Initialise the waterline instance.
  waterline.initialize(dbConfig, function(err, ontology) {
    if (err) {
      return console.log(`err`.red);
    }

    console.log(`database init at ${config.db.host}:${config.db.port}/${config.db.database} success`.blue)
  })
}


export default init
