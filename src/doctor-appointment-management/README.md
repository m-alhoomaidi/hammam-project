# Doctor Appointment Management Module

This module handles the management of doctor appointments, including retrieving upcoming appointments, completing appointments, and canceling appointments.

## API Endpoints

### Get Upcoming Appointments
- **Endpoint**: GET `/doctor-appointments`
- **Query Parameters**: 
  - `doctorId` (required): ID of the doctor
- **Response**: Array of appointments
- **Example**:
```bash
curl "http://localhost:3000/doctor-appointments?doctorId=123"
```

### Complete Appointment
- **Endpoint**: POST `/doctor-appointments/:id/complete`
- **URL Parameters**:
  - `id`: Appointment ID
- **Response**: Empty response with status 200 if successful
- **Example**:
```bash
curl -X POST "http://localhost:3000/doctor-appointments/appointment123/complete"
```

### Cancel Appointment
- **Endpoint**: POST `/doctor-appointments/:id/cancel`
- **URL Parameters**:
  - `id`: Appointment ID
- **Response**: Empty response with status 200 if successful
- **Example**:
```bash
curl -X POST "http://localhost:3000/doctor-appointments/appointment123/cancel"
```

## Testing the APIs

### Prerequisites
1. Make sure the application is running:
```bash
npm run start:dev
```

### Testing Steps

1. **Get Upcoming Appointments**
   ```bash
   # Replace 123 with an actual doctor ID
   curl "http://localhost:3000/doctor-appointments?doctorId=123"
   ```
   Expected response: Array of appointments for the specified doctor
   ```json
   [
     {
       "id": "appointment123",
       "doctorId": "123",
       "status": "scheduled",
       // ... other appointment details
     }
   ]
   ```

2. **Complete an Appointment**
   ```bash
   # Replace appointment123 with an actual appointment ID
   curl -X POST "http://localhost:3000/doctor-appointments/appointment123/complete"
   ```
   Expected response: Empty response with status 200

3. **Cancel an Appointment**
   ```bash
   # Replace appointment123 with an actual appointment ID
   curl -X POST "http://localhost:3000/doctor-appointments/appointment123/cancel"
   ```
   Expected response: Empty response with status 200
