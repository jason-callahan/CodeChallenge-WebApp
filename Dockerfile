# Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependencies and install first (for caching)
COPY package.json package-lock.json* ./ 
RUN npm install

# Copy app source
COPY . .

# Expose Vite dev port
EXPOSE 5173

# Run dev server with host binding
CMD ["npm", "run", "dev", "--", "--host"]
