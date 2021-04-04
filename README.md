# co-habiters

📝 [![Netlify Status](https://api.netlify.com/api/v1/badges/9d4282f1-2e4a-4d3c-baa0-580d6a1dbbb0/deploy-status)](https://app.netlify.com/sites/condescending-yalow-091244/deploys)  🚀  ![Heroku](https://pyheroku-badge.herokuapp.com/?app=habit-your-way&style=flat)  ⚖️  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Project description


# Installation & usage

### For our app to be run on your local machine:

Clone this repo and navigate to the root directory of this repo.

To start docker compose with client, server and database containers  
`bash _scripts/startDev.sh`    

To run dB in shell 
`bash _scripts/psql.sh`

**Clientside:** localhost:8080   
**API:** localhost:3000

To teardown docker compose completely  
`bash _scripts/teardown.sh`  

# Technologies

## Dependencies:
**Server:** cors, express

**Client:** 

## DevDependencies:
**Server:** jest, supertest, nodemon

**Client:** watchify, concurrently, jest, jest-fetch-mock, coverage


# Process
1. Plan design and project's MoSCoW  
2. Set up Docker Compose containers for Client, Server, Database  
3. Set up file structure 
4. Server up and running, database seeds and schema created, client skeleton added 
5. Deploy Client to Netlify and API to Heroku 


# Wins & Challenges 

## Wins 

## Challenges 


Should have:

Screenshots/Images

Could have:

Badges
Contribution guide
Code snippets
Bugs
Future features
