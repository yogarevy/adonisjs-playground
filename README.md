# Adonis fullstack application

jika belum install adonis run command
```bash
npm i -g @adonisjs/cli
```

## Setup

create file `.env` pada root project dan copy isi `.env.example` ke `.env` atau run command terminal di root project
```bash
cp .env.example .env
```
Buat database di MySQL
kemudian setting pengaturan database di `.env` disesuaikan dengan database masing-masing

kemudian run command terminal `npm install` dalam root project.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

### Run

```js
adonis serve --dev
```
