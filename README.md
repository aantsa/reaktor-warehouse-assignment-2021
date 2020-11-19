# Pre-assignment for Reaktor Junior 2021
![reaktor](https://user-images.githubusercontent.com/49878974/99691154-94ccb400-2a91-11eb-9344-93f8cac0634d.png)

This is my repository for Reaktor Junior 2021's pre assignment.

I created a working app for warehouse workers to fetch live data from two different legacy APIs.
This web app is created using mean-stack. MongoDB as a database, backend using node.js and express and the client side is created with angular and bootstrap.

Taking advantage of caching data; the app works smoothly after loading data for the first time.

## This app features
- [x] Own database for restoring data
- [x] Getting data from two legacy APIs.
- [x] Backend to prevent data loss.
- [x] Caching data to improve the apps efficiency.
- [x] Filtering to find wanted product fast.
- [x] Pagination to load only the wanted amount of data.
- [x] Updating the data and inserting new data if it doesnt already exist in the database.
- [x] Loading indicator to notify the end user that the app is loading data.
- [x] Responsive and scalable user interface
- [ ] Adding filtering for every property

## To run this app:
Run `npm install` to install frontend dependencies

Run `npm install` in the API folder to install the backend.

Run `npm start` in the API folder to start the backend of the app (runs in http://localhost:3000)

Run `ng serve` to start the frontend of the app (runs in http://localhost:4200)
