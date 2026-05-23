# AuthJS API 🚀

Backend API built with NestJS, PostgreSQL, Redis, TypeORM and Docker.  
Supports multi-tenant architecture and database migrations.


## 🚀 Run with Docker

```bash
docker compose up --build

docker exec -it authjs_api yarn migration:generate src/database/migrations/Init
docker exec -it authjs_api yarn migration:run
docker exec -it authjs_api yarn migration:revert
