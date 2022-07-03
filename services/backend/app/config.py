import multiprocessing
import os
from distutils.util import strtobool


# class BaseConfig:
#     HOST = "0.0.0.0"
#     PORT = 5000
#     DEBUG = False
#
#
# class Development(BaseConfig):
#     PORT = 5000
#     MONGODB_URL = "mongodb://mongodb/dev"
#     DEBUG = True
#
#
# class Testing(BaseConfig):
#     MONGODB_URL = "mongodb://mongodb/test"
#
#
# class Prod(BaseConfig):
#     MONGODB_URL = "mongodb://mongodb/prod"


bind = os.getenv('WEB_BIND', '0.0.0.0:5000')
accesslog = '-'
access_log_format = "%(h)s %(l)s %(u)s %(t)s '%(r)s' %(s)s %(b)s '%(f)s' '%(a)s' in %(D)sµs"  # noqa: E501

workers = int(os.getenv('WEB_CONCURRENCY', multiprocessing.cpu_count() * 2))
#keepalive = 120
#timeout = 120
worker_class = "gthread"
threads = int(os.getenv('PYTHON_MAX_THREADS', 1))

reload = bool(strtobool(os.getenv('WEB_RELOAD', 'false')))
#
#
#
# if __name__ == "__main__":
#     app.run()
