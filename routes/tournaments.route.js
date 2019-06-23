const token = process.env.API_KEY;
const api = "https://api.smash.gg/gql/alpha";

const fetch = require('isomorphic-fetch')
const express = require('express');
const app = express();
const router = express.Router();

getTour = async() => {

    const query = `
    query SocalTournaments($perPage: Int, $videogameId: ID, $coordinates: String!, $radius: String!) {
        tournaments(query: {
          perPage: $perPage
          filter: {
            upcoming: true
            videogameIds: [
              $videogameId
            ]
            location: {
              distanceFrom: $coordinates,
              distance: $radius
            }
          }
        }) {
          nodes {
            id
            name
            city
            url
            venueAddress
            venueName
            countryCode
            mapsPlaceId
            startAt
            details
            images{
              id
              width
              height
              ratio
              type
              url
              isOriginal
              entity
              entityId
              uploadedBy
            }
          }
        }
      }
    `
  
    const variables = {
        perPage: 50,        
        videogameId: 1386,
        coordinates: "20.9754,-89.6170",
        radius: "200mi"
    }
  
    const result = await fetch(api, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify({query, variables})
    })
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch((e) => {
      console.log(e)
    })
  
    return result.data
}
  
main = async() => {
  const data = await getTour()
  return data;
}

router.get('/nearby', async (req, res)=>{
    let tournaments =  await main();
    let result = tournaments.tournaments.nodes
    res.send(result);
})


// PAST TOURNAMENTS
getPastTour = async() => {

  const query = `
  query SocalTournaments($perPage: Int, $videogameId: ID, $coordinates: String!, $radius: String!) {
      tournaments(query: {
        perPage: $perPage
        filter: {
          upcoming: false
          videogameIds: [
            $videogameId
          ]
          location: {
            distanceFrom: $coordinates,
            distance: $radius
          }
        }
      }) {
        nodes {
          id
          name
          city
          url
          venueAddress
          venueName
          countryCode
          mapsPlaceId
          startAt
          details
          images{
            id
            width
            height
            ratio
            type
            url
            isOriginal
            entity
            entityId
            uploadedBy
          }
        }
      }
    }
  `

  const variables = {
      perPage: 15,        
      videogameId: 1386,
      coordinates: "20.9754,-89.6170",
      radius: "200mi"
  }

  const result = await fetch(api, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    },
    body: JSON.stringify({query, variables})
  })
  .then(response => response.json())
  .then(data => {
    return data
  })
  .catch((e) => {
    console.log(e)
  })

  return result.data
}

main3 = async() => {
const data = await getPastTour()
return data;
}

router.get('/past', async (req, res)=>{
  let tournaments =  await main3();
  let result = tournaments.tournaments.nodes
  res.send(result);
})



// ONLINE TOURNAMENTS
getOnline = async() => {

  const query = `
  query SocalTournaments($perPage: Int, $videogameId: ID) {
      tournaments(query: {
        perPage: $perPage
        filter: {
          upcoming: true
          videogameIds: [
            $videogameId
          ]
        }
      }) {
        nodes {
          id
          name
          isOnline
          startAt
          details
          url
          images{
            id
            width
            height
            ratio
            type
            url
            isOriginal
            entity
            entityId
            uploadedBy
          }
        }
      }
    }
  `

  const variables = {
      perPage: 200,        
      videogameId: 1386
  }

  const result = await fetch(api, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    },
    body: JSON.stringify({query, variables})
  })
  .then(response => response.json())
  .then(data => {
    return data
  })
  .catch((e) => {
    console.log(e)
  })

  return result.data;
}

main2 = async() => {
  const data2 = await getOnline();
  return data2;
}

router.get('/online', async (req, res)=>{
    let tournaments =  await main2();
    let result = tournaments.tournaments.nodes.filter(tournament => { return tournament.isOnline })
    res.send(result);
})

module.exports = router;