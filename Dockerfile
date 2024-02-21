# Use the official Node.js 14 LTS image as the base image
FROM node:14

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files into the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of your application's code into the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run your app
CMD ["node", "src/app.js"]
