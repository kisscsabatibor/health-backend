# HealthBackend

Back-end part of the project Health

## Running

Create .env file in root directory, add DB_URI and JWT_SECRET (CooSpace)

### Local

```
npm i
npm run dev
```

### Docker

```
docker build -t health-backend .
docker container run -p 3000:3000 health-backend
```
