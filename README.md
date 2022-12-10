# Pre-assignment for Reaktor Junior 2021
![reaktor](https://user-images.githubusercontent.com/49878974/99691154-94ccb400-2a91-11eb-9344-93f8cac0634d.png)
This is my repository for [Reaktor Junior 2021's pre assignment](https://www.reaktor.com/junior-dev-assignment/).

[Backend repo](https://github.com/aantsa/reaktor-warehouse-assignment-backend).

The app is live on [Heroku](https://reaktor-warehouse-assignment.herokuapp.com/)

edit: [10.12.2022] not live anymore, since Heroku is not free anymore.

I created a working app for warehouse workers to fetch live data from two different legacy APIs.
This web app is created using mean-stack. MongoDB as a database, backend using node.js and express and the client side is created with angular and bootstrap.

Taking advantage of caching data; the app works smoothly after loading data for the first time.

## This app features
- [x] Own database for restoring data.
- [x] Getting data from two legacy APIs.
- [x] Backend to prevent data loss.
- [x] Caching data for 5 minutes to improve the apps efficiency.
- [x] Filtering to find wanted product fast.
- [x] Pagination to load only the wanted amount of data.
- [x] Updating the data and inserting new data if it doesnt already exist in the database.
- [x] Loading indicator to notify the end user that the app is loading data.
- [x] Responsive and scalable user interface.
- [x] Timed backend data fetch.
- [ ] Adding filtering for every property.
- [ ] Able to create different user profiles and authorization (profile dropdown menu is a template for this feature).

## To run this app:

Fetch backend from https://github.com/aantsa/reaktor-warehouse-assignment-backend.
Create .ENV file to the API folder and create property DB_CONNECTION which includes your mongodb database link.

First time running the app locally will take few minutes to load data to your database. (So the tables won't be populated when the data is being fetched, but after it).
If you don't want to fetch data everytime you open the app, comment out the function calls from the files inside api/routes folder for example "availabilityData();".

Run `npm install` to install frontend dependencies.

Run `npm install` in the API folder to install the backend.

Run `npm start` in the API folder to start the backend of the app (runs in http://localhost:3000).

Run `ng serve` to start the frontend of the app (runs in http://localhost:4200).
