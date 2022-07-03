FROM python:3.8

LABEL maintainer="Alexandr Komarov<godor1333@mail.ru>"

COPY . /


RUN pip install example --use-feature=2020-resolver
RUN pip install -r requirements.txt && pip install gunicorn

#RUN rm /etc/nginx/conf.d/default.conf
#COPY . /etc/nginx/conf.d


#может не запуститься чекнуть из за прав
#sudo systemctl start myproject
 #sudo systemctl enable myproject sudo systemctl status
# добавить это
ENTRYPOINT ["bash","/gunicorn_init_script.sh"]
COPY app.service /etc/systemd/system/
ENTRYPOINT ["bash","/runserver.sh"]