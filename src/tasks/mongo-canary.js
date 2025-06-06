const testData = [
  'Columba livia',
  'Columba rupestris',
  'Columba leuconota',
  'Columba guinea',
  'Columba albitorques',
  'Columba oenas',
  'Columba eversmanni',
  'Columba oliviae',
  'Columba palumbus',
  'Columba trocaz',
  'Columba bollii',
  'Columba junoniae',
  'Columba unicincta',
  'Columba arquatrix',
  'Columba sjostedti',
  'Columba palumboides',
  'Columba janthina',
  'Columba versicolor',
  'Columba jouyi',
  'Columba vitiensis',
  'Columba leucomela'
]

const collection = 'canary'

export async function checkMongo(server) {
  // Upsert test data with random values
  for (const data of testData) {
    await server.db.collection(collection).replaceOne(
      { name: data },
      {
        name: data,
        updated: new Date(),
        count: Math.floor(Math.random() * 1000)
      },
      { upsert: true }
    )
  }

  // Run a few searches on the test data
  await server.db.collection(collection).findOne({ name: 'Invalid Value' })

  for (const data of testData) {
    await server.db.collection(collection).findOne({ name: data })
  }

  // Run an aggregation on the test data
  await server.db.collection(collection).aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 'count' }
      }
    }
  ])
}
