# used for starting a standalone backend server
# connecting to the network specified in the docker-compose file
docker run \
  --network robot-manager_robot-manager \
  -e PORT=5000 \
  -e DB_NAME=robot_manager \
  -e DB_USER=user \
  -e DB_PASSWORD=pass \
  -e DB_HOST=db \
  -e DB_PORT=5432 \
  -p 5008:5000 \
  robot-manager-be-standalone