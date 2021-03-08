#!/bin/sh

# TODO seed shell script retry seed mongoDB when conection timeout

# sleep for waiting mongod started
sleep 5

# add user
mongo -u 'restaurant' -p 'restaurant' 127.0.0.1:27017/admin create-user.js

# seed data
mongo -u 'root' -p 'password' --authenticationDatabase admin 127.0.0.1:27017/restaurant seed-data.js
