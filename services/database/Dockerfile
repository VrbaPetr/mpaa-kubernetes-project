# oficialni postgres docker image
FROM postgres:15

# automaticke vytvoreni db
ENV POSTGRES_DB=kubernetes_project
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin123

# Inicializacni skript
COPY init.sql /docker-entrypoint-initdb.d/

# Port
EXPOSE 5432