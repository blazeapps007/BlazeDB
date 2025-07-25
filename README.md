## steemdb 
[https://blazescanner.org](https://blazescanner.org)

open source blockchain explorer for the steem blockchain - build on phalcon + mongodb

### Prerequisites

- docker

### Components

1. `./app/` steemdb website: TypeScript
2. `./docker/sync` sync service  for keeping the blockchain synchronized and up to date. Runs on a 3 second delay and triggers updates in the database.
3. `./docker/history` account history service (python + piston) which runs every 6 hours and analyzes every account on the blockchain. Records historical information as well as a current snapshot.
4. `./docker/witnesses` witness/mining service (python + piston) which runs every minute to pull current witness information as well as the mining queue.

### Getting it running

This explorer synchronizes the entire blockchain into a mongodb database. This takes a LOT of time. **I'd highly recommend you run a local instance of steemd** and modify the `docker-compose.yml` to point to it. It's going to be a lot faster of a sync than trying to read the entire blockchain from a public node.

`docker-compose up` should be all you need to get the development application running.

If you'd like to run any of the synchronization services for initialization, you will need to uncomment the specific service from the `docker-compose.yml` file. For example:

- If you're looking to work on the account pages and start recording their history, uncomment the `history` service and start your containers.

You can uncomment all 3 services to start all applications when docker creates it's containers.

The initial synchronization run by the sync service will take many hours to complete and process all of the blocks. It will also require an enormous amount of disk space. As time progresses, this data will be trimmed. For now in early alpha it's better to have it all.

### Run in several independent containers

```
# Web Server
docker run -itd \
    --name steemdb-web \
    --restart always \
    -e MONGODB=mongodb://x.x.x.x:27017 \
    -e STEEMD_URL=https://api.steemit.com \
    -p 8000:8000 \
    steemit/steemdb:development

# Sync Service
docker run -itd \
    --name steemdb-syncd \
    --restart always \
    -e MONGODB=mongodb://x.x.x.x:27017 \
    -e STEEMD_URL=https://api.steemit.com \
    -e LAST_BLOCK=1 \
    steemit/steemdb:sync

# History Service
docker run -itd \
    --name steemdb-history \
    --restart always \
    -e MONGODB=mongodb://x.x.x.x:27017 \
    -e STEEMD_URL=https://api.steemit.com \
    steemit/steemdb:history

# Witnesses Service
docker run -itd \
    --name steemdb-witnesses\
    --restart always \
    -e MONGODB=mongodb://x.x.x.x:27017 \
    -e STEEMD_URL=https://api.steemit.com \
    steemit/steemdb:witnesses

# Live Service
docker run -itd \
    --name steemdb-live\
    --restart always \
    -e LIVE_PORT=8888 \
    -e STEEMD_URL=https://api.steemit.com \
    steemit/steemdb:live
```

# Notice

Forked by https://github.com/aaroncox/steemdb
