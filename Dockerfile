FROM node:14.15.1-alpine

COPY . .
RUN npm install && npx lerna exec -- npm i
RUN npm run build
RUN npm run clean

FROM node:14.15.1-alpine

EXPOSE 8080

COPY --from=0 api/build build
COPY --from=0 ui/build ui
COPY --from=0 api/package.json package.json
COPY --from=0 api/package-lock.json package-lock.json

RUN npm install --prod

CMD npm run serve
