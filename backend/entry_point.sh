#!/usr/bin/env bash

set -e

# 操作之前需先 migrate
python manage.py migrate

exec "$@"
