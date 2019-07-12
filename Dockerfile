FROM drakejin/node-mecab-ko:10.15.3

ADD . /opt/app
# 외부에서 땡겨오는 node_modules를 받지않게 하기 위함
RUN rm -rf node_modules

ENV TZ Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
WORKDIR /tmp
RUN cp /opt/app/package.json /tmp/package.json
RUN cp /opt/app/package-lock.json /tmp/package-lock.json
RUN npm install
RUN cp -R /tmp/node_modules /opt/app/node_modules

RUN npm install -g pm2

RUN chmod +x /opt/app/docker-entrypoint.sh
ENTRYPOINT [ "/opt/app/docker-entrypoint.sh" ]

WORKDIR  /opt/app
EXPOSE 4000






