# Use the Node.js latest image as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source inside Docker image
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Build the React app
CMD ["npm", "run", "dev"]