FROM cypress/base:14

COPY package*.json ./

RUN npm install
RUN ./node_modules/.bin/cypress verify
# Bundle app source
COPY . .
COPY cypress.ci.json ./cypress.json

