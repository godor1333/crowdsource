pwd=$(pwd)
echo '[Unit]
Description=Gunicorn instance to serve app
After=network.target

[Service]
User=alex
Group=www-data' > app.service

echo 'WorkingDirectory='$pwd''  >> app.service
echo 'Environment="PATH='$pwd'/venv/bin"' >>  app.service
echo 'ExecStart='$pwd'/venv/bin/gunicorn --workers 3 --bind unix:app.sock -m 007 app.config:app' >> app.service
echo '[Install]' >> app.service
echo 'WantedBy=multi-user.target' >> app.service




