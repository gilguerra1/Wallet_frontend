# Serve static frontend with nginx (alpine)
FROM nginx:alpine

LABEL maintainer="jpco0"

WORKDIR /usr/share/nginx/html

# remove default static assets if present then copy project
RUN rm -rf ./*
COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
