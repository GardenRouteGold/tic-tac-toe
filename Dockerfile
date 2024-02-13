# Use Node 16 alpine as parent image
FROM node:16-bullseye

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN yarn build
# Install Playwright
RUN yarn playwright install --with-deps
# Expose the port your app runs on
EXPOSE 3000 9323 8080

# Define the command to run your app
CMD ["yarn", "start"]