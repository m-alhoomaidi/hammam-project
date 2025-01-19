# Doctor Appointment System - Modular Monolith

A modular monolith application for managing doctor appointments, built with NestJS, demonstrating different architectural patterns in each module.

## 🏗️ Architecture Overview

The system is divided into four modules, each implementing a different architectural pattern:

### 1. Doctor Availability Module (Traditional Layered)

- Manages doctor's time slots
- Follows traditional layered architecture
- Layers: Controller → Service → Repository

### 2. Appointment Booking Module (Clean Architecture)

- Handles appointment booking process
- Implements Clean Architecture principles
- Layers: Controllers → Use Cases → Domain → Infrastructure

### 3. Appointment Confirmation Module (Clean / Hexagonal)

- Handles notification after booking

### 4. Doctor Appointment Management (Hexagonal)

- Manages existing appointments
- Implements Hexagonal (Ports & Adapters) Architecture
- Clear separation of domain from external concerns

## 🚀 Features

### Doctor Availability

- List available slots
- Add new time slots
- Manage slot availability

### Appointment Booking

- View available slots
- Book appointments
- Validate slot availability

### Appointment Confirmation

- Notify both doctor and patient
- Logging-based notifications

### Appointment Management

- View upcoming appointments
- Mark appointments as completed
- Cancel appointments

## 📁 Project Structure

- src/doctor-availability
- src/notification
- src/appointment-booking
- src/appointment-management

## 📚 Documentation

- [Notification Module](src/notification/README.md)

## 📚 Tests

- [Notification Module](src/notification/__tests__/README.md)

## 🛠️ Technical Stack

- Framework: NestJS
- Language: TypeScript
- Storage: In-Memory (easily replaceable with any database)
- Testing: Jest

## 🚦 Getting Started

### Prerequisites

- Node.js (v16+)
- npm/yarn

### Installation

```bash
npm install
```

### Running the application

```bash
npm run start
```

### Running the tests

```bash
npm run test
```
