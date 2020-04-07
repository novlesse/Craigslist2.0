const { Client } = require('@googlemaps/google-maps-services-js')
const client = new Client()
const cache = {}

const getPlaceID = async ( search ) => {
  if (search in cache) return cache[search]

  const placeID = (await client.findPlaceFromText({
    params: {
      input: search,
      language: 'en',
      inputtype: 'textquery',
      fields: ['place_id'],
      // bias towards lat/lng of user
      // locationbias: '',
      key: process.env.MAPS_APIKEY
    }
  })).data.candidates[0].place_id

  console.log( `\nplaceID of "${search}":\n${placeID}` )
  cache[search] = placeID

  return placeID
}

module.exports = { getPlaceID }
