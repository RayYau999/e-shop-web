
# Stage 1: Build React app
FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# debug
RUN echo "PAYPAL_CLIENT_ID length: ${#REACT_APP_PAYPAL_CLIENT_ID}" && \
    echo "PAYPAL_WEBHOOK_ID length: ${#REACT_APP_PAYPAL_WEBHOOK_ID}" && \

# contruct arguments for build command
ARG REACT_APP_PAYPAL_CLIENT_ID
ENV REACT_APP_PAYPAL_CLIENT_ID=$REACT_APP_PAYPAL_CLIENT_ID

ARG REACT_APP_PAYPAL_WEBHOOK_ID
ENV REACT_APP_PAYPAL_WEBHOOK_ID=$REACT_APP_PAYPAL_WEBHOOK_ID

RUN npm run build

# Use official Nginx image
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy React build files to Nginx's public directory

#this "COPY" is for local build
#COPY build/ /usr/share/nginx/html

#this "COPY" is for build in docker
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx config (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]