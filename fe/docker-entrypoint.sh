#!/bin/sh

# set environment variable defaults
export PORT="${PORT:-80}"
export SERVER_NAME="${SERVER_NAME:-localhost}"
export API_URL="${API_URL:-http://localhost:5000}"

# varibles to substitute in the template
VARS='$PORT $SERVER_NAME $API_URL'

# substitute environment variables in the template and save to nginx.conf
envsubst "$VARS" < /etc/nginx/templates/nginx.conf.template > /etc/nginx/nginx.conf

# execute the CMD
exec "$@"
