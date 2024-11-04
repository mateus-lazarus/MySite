FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

#Run npm install
RUN npm install

# Bundle app source
COPY . .

#Expose port and start application
EXPOSE 5000

CMD [ "npm", "run", "start-prod" ]