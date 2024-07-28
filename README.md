# Simple Note Manager

## Overview

Simple Note Manager is a lightweight application built with Node.js and Fastify, designed for managing notes within topics. Users can create topics and add multiple notes to each topic. The backend uses MongoDB for storing data, ensuring flexibility and scalability.

## Features

- Create, read, update, and delete (CRUD) operations for topics
- CRUD operations for notes within each topic
- Fast and efficient performance with Fastify
- Data persistence with MongoDB

## Requirements

- Node.js (v18 or later)
- MongoDB (v4.4 or later)

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/HenriqueMendesCoelho/simple-note-manager.git
   cd simple-note-manager
   ```
2. **Install dependencies:**
   ```sh
   yarn install
   ```
3. **Set up environment variables:**
   ```sh
   JWT_SECRET=<SECRET>
   MONGO_URI=<URI_TO_YOUR_MONGO>
   TOKEN_MAX_AGE_HOURS=<maxage> ex: 12h
   PORT=<PORT> default: 5000
   ```
4. **Run the application::**
   ```sh
   yarn start
   ```

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
