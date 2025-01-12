# Use a smaller base image for reduced size
FROM node:18-alpine AS build

# Set environment variable for production
ENV NODE_ENV=production

# Create and set app directory
WORKDIR /app

# Copy only the necessary files for installing dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production --omit=dev

# Copy application source code
COPY . .

# Run the build-css script
CMD ["npm", "run", "build-css"]

# Remove the unecessary archives built
RUN rm -rf ./scss
RUN rm -rf ./views
RUN rm -rf ./.git
RUN rm -f .dockerignore .gitignore Dockerfile docker-compose.yml README.md vercel.json dockerScripts.sh

# Expose the application port
EXPOSE 5000

# Use non-root user for security
USER node

# Start the application
CMD ["npm", "run", "start-prod"]
