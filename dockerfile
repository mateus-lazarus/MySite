# Use a smaller base image for reduced size
FROM node:18-alpine AS build

# Set environment variable for production
ENV NODE_ENV=production

# Create and set app directory
WORKDIR /app

# Copy only the necessary files for installing dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application source code
COPY . .

# Expose the application port
EXPOSE 5000

# Use non-root user for security
USER node

# Start the application
CMD ["npm", "run", "start-prod"]
