FROM node
WORKDIR /app
COPY package.json  ./

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \ 
    then yarn install; \
    else yarn install --only=production; \
    fi

COPY . ./
# will run on port 4000 on MY machine!
ENV PORT 3000
EXPOSE ${PORT}
CMD [ "yarn","dev" ]
