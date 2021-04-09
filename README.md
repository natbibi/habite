# Project: Habité

📝 [![Netlify Status](https://api.netlify.com/api/v1/badges/9d4282f1-2e4a-4d3c-baa0-580d6a1dbbb0/deploy-status)](https://app.netlify.com/sites/condescending-yalow-091244/deploys)  🚀  ![Heroku](https://pyheroku-badge.herokuapp.com/?app=habit-your-way&style=flat)  ⚖️  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A mobile friendly web-app that allows users to register for their own account. They can easily log and record their progress for any habits they wish to track, mark habits as complete for the day, and see their most recent completion streaks. The data is persists in a Postgres Database connected to Heroku.  

# Description

Habité! The name itself comes from the French word for “live”, which means our app is more than just a tool.  It’s a way for people to define their lifestyle choices and, more importantly, to do it their way!  

<include screenshots here>

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
**Api:** cors, express, bcrypt, dotenv, jsonwebtoken, pg, sql-template-strings, express-rate-limit  

**Client:** http-server, jwt-decode  

## DevDependencies:
**Api:** jest, supertest, nodemon

**Client:** watchify, concurrently, jest, jest-fetch-mock, coverage, dotenv, 

# Process
1. Plan design and project's MoSCoW  
2. Create a mockup of design, layout and basic functionality  
3. Set up Docker Compose containers for Client, Server, Database  
4. Set up file structure 
5. Server up and running, database seeds and schema created, client skeleton added 
6. Deploy Client to Netlify and API to Heroku with Heroku Postgres database add-on  

### API

### Client 
- Write layout tests
- Set up file structure, link stylesheets, packages, fonts, and bundle js files 
- Download necessary packages, dockerfile and test suites
- Split up tasks for layout, content, requests, auth, and testing    
- Connect front end to backend via fetch requests to api and database  
- Improve test coverage  

# Bugs 
- [x] navHandler is not defined on console
- [x] Logout button is broken - says can’t find that page / doesnt work on mobile
- [x] Register works if I just click register e.g not entering username or password values
- [ ] Register button should lead to #addhabits page - at this point profile is blank / but for users logging in, it makes sense to go to #profile
- [ ] Create new habit requires refresh before it appear on page
- [ ] Habits not appearing after login until page refresh 
- [ ] Buttons won't press on mobile.. too small? 
- [ ] Authentication cannot take place unless the "I am not a robot" checkbox has been checked
- [ ] Date in wrong format
- [ ] Streaks not working 

# Wins & Challenges 

## Wins 
- Working great together between front end and back end  
- Testing! Functions are split up and easy to test  

## Challenges 
- Setting up Heroku Postgres - issues with SSL and database credentials
- Writing a lot of js before bundling 
- Issues with date formatting  
- Time!  

# Code Snippet

[![code-snippet-rate-limiter.png](https://i.postimg.cc/6Q3HzDBk/code-snippet-rate-limiter.png)](https://postimg.cc/68kLpb2c)

Should have:

Screenshots/Images

Could have:

Badges
Contribution guide
Code snippets
Future features
