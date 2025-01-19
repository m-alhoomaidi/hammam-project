# Notification Module

A flexible notification module that supports multiple delivery channels (Logger, Firebase) with a clean, extensible architecture.

## Architecture

The module follows a Clean Architecture / Hexagonal Architecture approach with these main components:

### Domain Layer

- Core business entities
- Interface definitions
- Business rules

### Application Layer

- Service orchestration
- Business logic implementation

### Infrastructure Layer

- External service implementations
- Persistence
- Factories
- Configurations
- Third-party integrations

## Directory Structure

- src/notification/
  - domain/
    - entities/
    - interfaces/
    - constants/
  - application/
    - services/
  - infrastructure/
    - senders/
      - firebase-notification.sender.ts
      - logger-notification.sender.ts
    - config/
      - notification.config.ts
    - persistence/
      - in-memory/
      - typeorm/
    - factories/
      - notification-sender.factory.ts
  - **tests**/
    - domain/
      - notification.entity.spec.ts
    - application/
      - services/
    - infrastructure/
      - senders/
      - factories/
      - persistence/

## Features

- Multiple notification channels (Logger, Firebase)
- Extensible architecture for adding new channels
- Repository pattern for data persistence
- Configurable through environment variables
- Full test coverage
- Type-safe implementation
