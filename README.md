# 👋 Hello! I am Lidia, and I am building a Learning management system (LMS)

### tl;dr: 
 - [Notion page](https://www.notion.so/lidiakovac/SOLO-CAPSTONE-60bd6b2e4a254a6a8e5025db83966905)
 - Live demos coming soon 
 - Building with Typescript and Sequelize 
 - [Backend repo](https://github.com/LidiaKovac/learning-management-system-BE)


### 🖥️ Check out this project's [Notion](https://www.notion.so/lidiakovac/SOLO-CAPSTONE-60bd6b2e4a254a6a8e5025db83966905) for to-dos, mocks and releases! 


# 🗓️ Daily LOG: 

### Day -2 / -1 - Reasearch
- Researched definitions and basic features
- Created common space on Notion
- Created list of a bunch of features
- Researched a list of libraries 

### Day 0 - Planning 

- Updated Notion page with releases 
- Set deadline for first release on monday 15th (?)
- Created hosted heroku SQL (Postgres) database
- Created [backend repo](https://github.com/LidiaKovac/learning-management-system-BE)

### Day 1 - First day of coding, had a fist fight with Sequelize and Typescript

- Spent from 9 AM to 2 PM trying to create associations between tables without upsetting TS
- Wrote notes about Sequelize and TS on BE README.MD for posterity
- Created User CRUD 
- Started with authorization

### Day 2 - First steps 
- ~Jest setup~ -> need help on that
- Login routes
- Authorization and roles middlewares
### Day 3 - Testing and frontend
- Tested all user and login routes on postman 
    - [x] GET user/admin - gets all users 

    - [x] GET user/admin/:query/:identifier - search (query = column, identifier = value)

    - [x] PUT user/admin/:id - edits a profile (admin only)

    - [x] DELETE user/admin/:id - deletes a profile (admin only) 

    - [x] PUT user/me - edits own profile 

    - [x] DELETE user/me - deletes own profile 

    - [x] POST login/ - creates a user 

    - [x] GET login/ - logs in

    - [x] GET login/me - gets logged user 
- Created Logout 
- Started on files endpoint 
- Discarded cloudinary as a video/audio cloud -> need another option
   - Could also use google storage api, but it would require google oAuth, maybe next release? 
- Started on frontend
### Day 4 - Login and registration
- Finished login frontend with cookies
- Started registration page 


-- skipped a few days --


### Day 5 - Finish registration and start dashboard
- Noticed an unhandled error in login 
- Finished registration page 
- Arranged redirect
- Started on Student Dashboard 
- Worked with react-calendar and recharts

### Day 6 - Jest (finally) and responsiveness 
- Set up Jest in the backend 
- Made dashboard responsive

### Day 7 - ~Jest is broken again~ FIXED! 🙏
- Jest broken again
- Moved file hosting from cloudinary to firebase 
- Created file upload on frontend
- Fixed responses for logged user retrieval on backend to match frontend and to have json format

### Day 8 - Running late
- Finished notes upload page
- Started on editor
- Made backend for note-taking
- Started frontned for note-taking

### Day 9 - Auto-save
- Tried implementing auto-save on notes (failed)
- Finished frontend page for note taking
- Added classes and events endpoints 

### Day 10 - Sequelize strikes again: 
- Created model for Student_Class table
 - Found a way to create many to many relationships.
- [ ] Add events on the frontend

### Day 11 - Events: 
- Finished image uploader on note taking section
- Started implementing event on frontend

### Day 12 - Events and feedback 
- Finished events on frontend 

BY MONDAY: 
 feedback for homework, which includes: 
  - change event model to include homework
  - homeoworks have different structure 
  - homework can have comments 
  - homework can be of graded type or not 
