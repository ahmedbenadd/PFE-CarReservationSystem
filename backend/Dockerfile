# Use the Node.js latest image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies (including dev dependencies)
RUN npm install

# Install nodemon globally (optional but recommended for easier access during development)
RUN npm install -g nodemon

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 5000

# Define the command to run the app in development mode
CMD ["npm", "run", "dev"]