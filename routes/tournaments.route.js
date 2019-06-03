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
  

router.get('/', async (req, res)=>{
    let result =  await main();
    res.send(result);
})

module.exports = router;