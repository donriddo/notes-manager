# Notes Manager

Notes Manager is an application built using NestJS and MongoDB. Notes Manager contains APIs to store, retrieve, and manage notes.

## Features

- RESTful APIs
- Integrated MongoDB for persistent data storage
- Interactive Swagger documentation for API testing and exploration

## Getting Started

These instructions will get your copy of the Notes Manager up and running on your local machine for development and testing purposes.

### Prerequisites

- Docker (for Docker-based setup)
- Node.js and Yarn (for direct setup)
- MongoDB (for direct setup)

### Running via Docker (Recommended)

This method uses Docker to set up the environment, which comes pre-packaged with MongoDB for ease of use.

1. **Environment Setup**:
   Copy the sample environment file to create your own `.env` file:

```bash
cp .env.sample .env
```

2. **Start the Application**:
   Use Docker Compose to build and start the application:

```bash
docker compose up
```

3. **Start the Application**:
   Once the application is running, access the interactive Swagger documentation at:

```
http://localhost:${NODE_LOCAL_PORT}/apidoc
```

### Running directly

For direct setup, ensure you have Node.js, Yarn, and MongoDB installed on your machine.

1. **Environment Setup**:
   Copy the sample environment file to create your own `.env` file:

```bash
cp .env.sample .env
```

2. **MongoDB Config**:
   Set up your MongoDB instance and ensure the credentials match those in your `.env` file.
3. **Start the Application**:
   Use Yarn to install dependencies and start the application:

```bash
yarn install
yarn start
```

4. **Access the Application**:
   Access the Swagger documentation at the same URL as mentioned in the Docker method.
