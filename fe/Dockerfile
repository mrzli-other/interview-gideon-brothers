################################################################################
# Stage 1: Build the Angular Application
################################################################################

# node image
FROM node:22 AS build

# set up working directory in the container
WORKDIR /app

# copy files to the container
COPY . .

# install dependencies
RUN npm install

# build the Angular application
RUN npm run build

################################################################################
# Stage 2: Serve the Angular Application with Nginx
################################################################################

# nginx image
FROM nginx:alpine

# install dependencies
# - envsubst (for environment variable substitution in Nginx configuration template)
RUN apk add --no-cache gettext

# copy the build output from the previous stage to the nginx image
COPY --from=build /app/dist /usr/share/nginx/html

# copy the Nginx configuration template
COPY nginx.conf.template /etc/nginx/templates/nginx.conf.template

# copy the entrypoint script to the container
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# set the entrypoint (that will craete a subsituted Nginx configuration file from the template)
ENTRYPOINT ["/docker-entrypoint.sh"]

# start Nginx server
CMD ["nginx", "-g", "daemon off;"]
