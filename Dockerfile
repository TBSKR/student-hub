FROM python:3.12.3-alpine3.19

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE ${PORT:-5000}

CMD gunicorn -b 0.0.0.0:${PORT:-5000} "app:create_app()"
