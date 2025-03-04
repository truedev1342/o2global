FROM node:alpine3.16 AS build

# Set the working directory in the container
WORKDIR /app

# RUN npm install --global pm2

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install --legacy-peer-deps

# Copy the entire Next.js application to the working directory
COPY . .

#ARG NODE_ENV
# Build the Next.js application
RUN npm run build


# CMD [ "pm2-runtime", "npm run start" ]
# Start the application without PM2
CMD ["npm", "run", "dev"]
