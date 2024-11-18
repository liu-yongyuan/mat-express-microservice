```bash
docker pull docker.elastic.co/elasticsearch/elasticsearch:8.10.0

docker run -d \
  --name elasticsearch \
  -e "discovery.type=single-node" \
  -e "xpack.security.enabled=false" \
  -p 9200:9200 -p 9300:9300 \
  docker.elastic.co/elasticsearch/elasticsearch:8.10.0
```