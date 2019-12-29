FROM python:3.7

RUN mkdir /app

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
RUN python manage.py collectstatic --noinput
RUN python -m coverage run --source='.' manage.py test && python -m coverage report

ENTRYPOINT ["/bin/sh", "./entry_point.sh"]
