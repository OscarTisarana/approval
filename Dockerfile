# Use an official Node runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json /app/

# Install app dependencies
RUN npm config set fetch-retry-mintimeout 200000 \
    && npm config set fetch-retry-maxtimeout 1200000 \
    && npm install -g npm@8.5.1 \
    && npm update svgo

# Copy the rest of the application files to the container
COPY . .

# Build the React app
RUN npm run build

# Expose port 3000 for the container
EXPOSE 3000

# Define the command to start the container
CMD ["npm", "start"]