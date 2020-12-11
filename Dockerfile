FROM node:14.15.1-alpine

EXPOSE 8080

COPY api/node_modules node_modules
COPY api/build build
COPY ui/build ui
COPY api/package.json package.json

CMD npm run serve
