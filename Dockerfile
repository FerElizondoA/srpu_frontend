<<<<<<< HEAD
# Layer 1
FROM node:16.16.0-alpine
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
# layer1

COPY . .                                      

CMD [ "npm", "run", "start" ]
=======
FROM node:16.16.0-alpine
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY .npmrc.example .npmrc
COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm install @jbcecapmex/pakfirma
# Copy app files
COPY . .
# Expose port
EXPOSE 3000
# Start the app
CMD [ "npm", "start" ]
>>>>>>> d8c8267a4ea3a4f6d8fc4e1e17c2b88788077983
