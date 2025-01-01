docker build . -t mysite/node-web-app:v2
sudo docker run -d --name my-site-app --network nginx_proxy_manager_default -p 12345:5000 mysite/node-web-app:v2
