FROM node:16.16.0-alpine
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install
# Copy app files
COPY . .
# Expose port
EXPOSE 3000
# Start the app
CMD [ "npm", "start" ]