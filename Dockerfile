RUN npm install -g @nestjs/cli@10

user node

WORKDIR /home/node/nest

CMD ["tail", "-f", "/dev/null"]