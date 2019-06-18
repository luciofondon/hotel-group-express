
Construir imagen (lanzarlo desde el path de cada proyecto)
```sh
sudo docker build -t hotelgroup-api -f ../docker-local/Dockerfile .
```

```sh
sudo docker image ls
```

```sh
sudo docker run --run -p 3000:3000 hotelgroup-api
```