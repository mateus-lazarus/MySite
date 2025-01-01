sudo docker-compose build
sudo docker save -o ~/my-site-web_node-web-app.tar my-site-web
sudo scp ~/my-site-web_node-web-app.tar mateusadminserver@192.168.0.154:~/my-site-web_node-web-app.tar
ssh my-server -t "sudo docker load -i ~/my-site-web_node-web-app.tar & sudo docker run -d --name my-site-web-container --network nginx_proxy_manager_default -p 45455:5000 my-site-web:latest" 


