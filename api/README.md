[![pipeline status](https://gitlab.com/implicity-healthcare/products/project-templates/nest-js-microservice/badges/develop/pipeline.svg)](https://gitlab.com/implicity-healthcare/products/project-templates/nest-js-microservice/-/commits/develop) 
[![coverage report](https://gitlab.com/implicity-healthcare/products/project-templates/nest-js-microservice/badges/develop/coverage.svg)](https://gitlab.com/implicity-healthcare/products/project-templates/nest-js-microservice/-/commits/develop)


# Resource Service

This project is bootstrap quickstart guide to launch new microservice projects.

## Setup

```
npm i
npm run migrate:dev
```

Run

```
npm start:dev
```

## WARNING
Do not forget to set extension before initializing the database
```
       // this ensure we can use default: `uuid_generate_v4()`
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.createTable(new Table({
            name: "your_table",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    isUnique: true,
                    generationStrategy: 'uuid',
                    default: `uuid_generate_v4()`
                },
            ]
        }), true);
```
