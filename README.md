# CSE-416-Project

A service that utilizes QR Codes to authenticate a luxurious product.

# Team Members:
Hoi Ngai Pun\
Jacky Chen\
Jie Zhang\
Yu Peng Lu\
Yuqiang Lin

# Client

# Server
Before running anything on the server side, a .env file should be added to the server directory. The .env file should contain the following variables:\
JWT_SECRET //The secret that will be used to encrypt and descrype jwt tokens\
MONGO_URI //mongo uri that's used to connect to a mongo database\
TOKEN //api key used for making algorand api calls via the purestake endpoint; key can be obtained by signing up an account on https://www.purestake.com/
