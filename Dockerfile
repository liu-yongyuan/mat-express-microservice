# Use the official Node.js image from Docker Hub
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Set the environment variable for production
ENV NODE_ENV=production

# Expose the port your app runs on
EXPOSE 8080

# Command to run your application
CMD ["npm", "start"]
