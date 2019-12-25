import os

from fabric import Connection
from invoke import run

conn = Connection(host=os.environ['SERVER_HOST'], connect_kwargs={
    'key_filename': r'key.pem'
})

run('tar cvf dist.tar .')
conn.put('dist.tar')
conn.run('tar vxf dist.tar')
conn.run('rm dist.tar')

conn.sudo('docker-compose pull')
conn.sudo('docker-compose up --force-recreate --detach')
