# docker with mysql

## Install
```bash
docker pull mysql:5.7
```

## Running
```bash
docker run --name mysql-container -v /xxx/xxx/mysql-container/my.cnf:/etc/mysql/my.cnf -e MYSQL_ROOT_PASSWORD=my-secret-pw -p 3306:3306 -d mysql:5.7

docker exec -it mysql-container mysql -u root -p -h 127.0.0.1
my-secret-pw
```

## mysql.cnf
```txt
[mysqld]
# MySQL Server Basic Settings
user = mysql
pid-file = /var/run/mysqld/mysqld.pid
socket = /var/lib/mysql/mysql.sock
port = 3306
basedir = /usr
datadir = /var/lib/mysql
skip-external-locking

# Character Set Configuration (utf8mb4 for full Unicode support)
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
init-connect = 'SET NAMES utf8mb4'
# This sets the default character set to utf8mb4 for all incoming client connections

# InnoDB Settings (for better performance and reliability)
innodb_buffer_pool_size = 1G
innodb_log_file_size = 256M
innodb_flush_log_at_trx_commit = 1
innodb_file_per_table = 1
innodb_log_buffer_size = 16M
innodb_flush_method = O_DIRECT
innodb_large_prefix = 1

# Performance and Tuning
max_connections = 100
wait_timeout = 100
interactive_timeout = 100
max_allowed_packet = 64M
table_open_cache = 2000
open_files_limit = 65535

# General Query Cache settings (optional, can be tuned for specific workloads)
query_cache_type = 0
query_cache_size = 0

# Enable the General Log if you want to log all queries (optional, for debugging)
# general_log = 1
# general_log_file = /var/log/mysql/general.log

# Enable the Slow Query Log if you want to capture long-running queries (optional)
# slow_query_log = 1
# slow_query_log_file = /var/log/mysql/slow.log
# long_query_time = 2

# Set the default storage engine to InnoDB
default-storage-engine = InnoDB

# Adjust for Docker's filesystem (useful for better disk I/O)
innodb_flush_log_at_trx_commit = 2
```