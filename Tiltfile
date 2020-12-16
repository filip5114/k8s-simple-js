k8s_yaml(['frontend/nginx.yaml', 'backend/node.yaml', 'storage/redis.yaml'])

docker_build('docker5114/app', 'frontend', dockerfile='Dockerfile-nginx')
docker_build('docker5114/node-app', 'backend', dockerfile='Dockerfile-nodejs',
    live_update=[
        sync('backend/*.js', '/usr/src/app/backend/index.js'),
        run('')
    ]
)
