#!/usr/bin/env sh
# wait-for-it.sh

set -e

host="$1"
shift
cmd="$@"

until nc -z "$host" 3306; do
  >&2 echo "MySQL no está disponible - esperando..."
  sleep 5
done

>&2 echo "MySQL está disponible - ejecutando el comando"
exec $cmd