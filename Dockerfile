FROM node:14.15.1-alpine

EXPOSE 8080

COPY packages/api/node_modules node_modules
COPY packages/api/build build
COPY packages/ui/build ui
COPY packages/api/package.json package.json

CMD npm run serve
