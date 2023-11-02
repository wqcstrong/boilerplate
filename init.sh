#!/bin/bash

# 检查是否存在 ./server-data/mysql/data 文件夹，如果不存在则创建
data_folder="./server-data/mysql/data"
if [ ! -d "$data_folder" ]; then
  mkdir -p "$data_folder"
  echo "Created $data_folder"
else
  echo "$data_folder already exists"
fi

# 检查是否存在 ./server-data/mysql/conf 文件夹，如果不存在则创建
conf_folder="./server-data/mysql/conf"
if [ ! -d "$conf_folder" ]; then
  mkdir -p "$conf_folder"
  echo "Created $conf_folder"
else
  echo "$conf_folder already exists"
fi

# 检查是否存在 ./server-data/mysql/conf/my.cnf 文件，如果不存在则创建
cnf_file="./server-data/mysql/conf/my.cnf"
if [ ! -f "$cnf_file" ]; then
  touch "$cnf_file"
  echo "Created $cnf_file"
else
  echo "$cnf_file already exists"
fi
