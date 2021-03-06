# server-alerts

This is full stack app really basic showing some alerts from a mysql database using React with Material UI, and NodeJS with Express for the Backend

## Run the app locally

1. First, fork the repo.

2. Clone the repo and get inside it.

```bash
$ git clone git@github.com:USERNAME/server-alerts.git server-alerts
$ cd server-alerts
```

5. Start docker containers to create database and app instance

**OPTIONAL** If you are trying to run the app in a apple silicon mac, you need to add `platform: linux/x86_64` inside the service mysql in the docker-compose.yml

```bash
$ docker-compose up -d
```

Wait until app has started at [http://localhost:3000](http://localhost:3000).

6. Run DB seeders

```bash
$ docker-compose exec backend npm run db:seed
```

8. To test the app go to [http://localhost:3000](http://localhost:3000)

## Backend API Documentacion

```http
GET /api/v1/alerts?searchTerm=string&page=integer
```

Search alert by description or server name

| Parameter    | Type      | Description                                                                                                             |
| :----------- | :-------- | :---------------------------------------------------------------------------------------------------------------------- |
| `searchTerm` | `string`  | **OPTIONAL** Search parameter, can be alert description or server name. If no value is sent, will return all the alerts |
| `page`       | `integer` | **OPTIONAL** Page index, if there is more than 20 alerts. If no value is sent, will return the first page               |

### Response

```javascript
{
    "pages": integer,
    "data": array,
    "currentPage": integer
}
```

The `pages` attribute return the total numbers of pages.
The `data` attribute return an array of all the alerts based on `searchTerm` param.
The `currentPage` attribute return the actual page for that search

```http
GET /api/v1/alerts/:id
```

Search alert by id

| Path Variables | Type      | Description            |
| :------------- | :-------- | :--------------------- |
| `id`           | `integer` | ID of the alert to get |

### Response

```javascript
{
    "id": integer,
    "server": string,
    "description": string,
    "server_type": string,
    "createdAt": datetime,
    "updatedAt": datetime
}
```

The `id` attribute return the ID of the alert.
The `server` attribute return the server name.
The `description` attribute return the problem of the alert
The `server_type` attribute return the type of the server can be `onprem` or `virtual`

```http
POST /api/v1/alerts/
```

Create an alert

### Body

```javascript
{
    "server": string,
    "description": string,
    "server_type": "onprem/virtual",
}
```

### Response

```javascript
{
    "id": integer,
    "server": string,
    "description": string,
    "server_type": string,
    "createdAt": datetime,
    "updatedAt": datetime
}
```

The `id` attribute return the ID of the alert.
The `server` attribute return the server name.
The `description` attribute return the problem of the alert
The `server_type` attribute return the type of the server can be `onprem` or `virtual`

```http
GET /api/v1/alerts/metrics
```

Get servers with most alerts in the month

### Response

```javascript
[
  {
    server: string,
    count: integer,
  },
  {
    server: string,
    count: integer,
  },
  {
    server: string,
    count: integer,
  },
];
```

The `server` attribute return the server name.
The `count` attribute return the number of alerts from that server.
