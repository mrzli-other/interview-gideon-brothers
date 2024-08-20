# used for starting a standalone backend server
# connecting to the network specified in the docker-compose file
docker run \
  --network robot-manager_robot-manager \
  -e PORT=80 \
  -e SERVER_NAME=localhost \
  -e API_URL=http://host.docker.internal:5000 \
  -p 4280:80 \
  -p 4243:443 \
  robot-manager-fe-standalone
