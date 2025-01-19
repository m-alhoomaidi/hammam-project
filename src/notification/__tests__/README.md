
## 📝 Test Cases Overview

### 1. Entity Tests (`notification.entity.spec.ts`)
- Create notification with patient ID
- Create notification with doctor ID
- Validate required fields
- Test mark as read functionality

### 2. Repository Tests (`in-memory-notification.repository.spec.ts`)
- Save notifications
- Find notifications with filters
- Mark notifications as read
- Handle edge cases

### 3. Sender Tests
#### Logger Sender (`logger-notification.sender.spec.ts`)
- Log notification messages
- Format output correctly
- Handle different message types

#### Factory Tests (`notification-sender.factory.spec.ts`)
- Get correct sender instance
- Handle invalid channel
- Validate sender creation

### 4. Service Tests (`notification.service.spec.ts`)
- Send notifications
- Save to repository
- Handle different channels
- Error scenarios

## 🔍 Test Patterns

### 1. Arrange-Act-Assert

- Setup the test environment
- Execute the code being tested
- Assert the expected results

### 2. Mocking

- Replace dependencies with test doubles
- Control input and output
- Isolate the unit being tested

### 3. Dependency Injection

- Inject dependencies into the class
- Use providers in the constructor
- Mock dependencies in tests

### 4. Test Doubles

- Replace real dependencies with fake or mock objects
- Control the behavior of the dependencies
- Isolate the unit being tested

### 5. Fixtures

- Create test data for each test case
- Reuse data across tests
- Keep tests clean and focused

### 6. Test Suites

- Group related tests together
- Organize tests logically
- Improve readability and maintainability
