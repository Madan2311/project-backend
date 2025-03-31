# project-backend# Project Backend

Este repositorio contiene el backend del sistema de gestión logística, desarrollado con Node.js, Express y TypeScript. La aplicación ofrece endpoints para autenticación, gestión de envíos, asignación de rutas y seguimiento en tiempo real mediante Socket.io y Redis. La base de datos utilizada es MySQL.

---

## Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Instalación y Configuración](#instalación-y-configuración)
- [Script de Creación de Base de Datos](#script-de-creación-de-base-de-datos)

---

## Descripción

Este backend está diseñado para soportar un sistema de gestión de envíos y rutas logísticas. Entre sus funcionalidades se destacan:

- **Autenticación y Autorización:** Registro, login y gestión de roles mediante JWT.
- **Gestión de Envíos:** Creación, asignación y seguimiento en tiempo real.
- **Reportes Avanzados:** Consultas con filtros, métricas de desempeño, paginación y caching con Redis.
- **Comunicación en Tiempo Real:** Uso de Socket.io para notificaciones en vivo.
- **Clean Architecture:** Organización del código en capas (controladores, servicios, repositorios).

---

## Tecnologías

- Node.js, Express, TypeScript
- MySQL (usando el paquete [mysql2](https://github.com/sidorares/node-mysql2))
- Redis
- Socket.io
- JWT para autenticación

---

## Instalación y Configuración

Requisitos Previos
- Node.js (v14 o superior)

- npm o yarn

- MySQL instalado y corriendo

- Redis instalado y corriendo (o configurado vía Docker)

- Git

Pasos para Instalar el Proyecto

Clona el repositorio: git clone https://github.com/Madan2311/project-backend.git

cd project-backend

Instala las dependencias:

npm install

Iniciar el backend:

npm run dev


## script-de-creación-de-base-de-datos
-- =========================================
-- Script de Creación de Base de Datos
-- =========================================

-- 1. Crear la base de datos 
CREATE DATABASE IF NOT EXISTS logistics_db;
USE logistics_db;

-- 2. Tabla de Usuarios
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabla de Transportistas
CREATE TABLE IF NOT EXISTS carriers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    contact_info VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabla de Rutas
CREATE TABLE IF NOT EXISTS routes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    origin VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabla de Vehículos
CREATE TABLE IF NOT EXISTS vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plate_number VARCHAR(20) NOT NULL UNIQUE,
    capacity INT NOT NULL, 
    type VARCHAR(50),
    status VARCHAR(50) DEFAULT 'available',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 6. Tabla de Envíos
CREATE TABLE IF NOT EXISTS shipments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    address VARCHAR(255) NOT NULL,
    carrier VARCHAR(100),
    status VARCHAR(50) NOT NULL,
    user_id INT,
    route VARCHAR(100),
    vehicle VARCHAR(20),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    delivered_at DATETIME DEFAULT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

-- =========================================
-- Crear índices para optimizar consultas
-- =========================================

-- Índices en shipments
CREATE INDEX idx_shipments_created_at ON shipments(created_at);
CREATE INDEX idx_shipments_delivered_at ON shipments(delivered_at);
CREATE INDEX idx_shipments_carrier ON shipments(carrier);

-- Índice en routes
CREATE INDEX idx_routes_name ON routes(name);

-- Índice en vehicles
CREATE INDEX idx_vehicles_plate_number ON vehicles(plate_number);

-- Índice en carriers
CREATE INDEX idx_carriers_name ON carriers(name);