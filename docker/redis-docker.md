# redis with docker

## Install
```bash
docker pull redis
```

## Running
```bash
docker run --name redis-container -p 6379:6379 -d redis
```

## Connect RedisCLI
```bash
docker exec -it redis-container redis-cli

select 1;

keys r_*;
```