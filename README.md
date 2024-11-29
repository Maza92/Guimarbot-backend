# Guimarbot Backend Project

Este documento describe cómo iniciar un proyecto utilizando `pnpm` para frameworks como **NestJS**, incluyendo la configuración para el uso de variables de entorno.

---

## Requisitos Previos

1. **Node.js**: Asegúrate de tener instalado Node.js (recomendado: versión LTS).
2. **pnpm**: Instala `pnpm` de manera global si aún no lo tienes:

```bash
npm install -g pnpm
```

## Iniciar Proyecto

Crear archivo `.env`

```bash
PORT = 5006

MYSQL_HOST = localhost
MYSQL_PORT = 3306
MYSQL_USERNAME = root
MYSQL_PASSWORD = root
MYSQL_DATABASE = guimarbot_db_dev
```

Instalar dependencias

```
pnpm install
```

Correr proyecto en modo desarrollo

```
pnpm start:dev
```
