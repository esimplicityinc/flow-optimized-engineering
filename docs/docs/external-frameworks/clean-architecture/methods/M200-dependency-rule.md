---
methodId: M200
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: Dependency Rule
pillar: dependency-management
description: Dependencies in source code must only point inward toward higher-level policies, never outward toward implementation details.
---

# Dependency Rule

**Pillar:** Dependency Management

The Dependency Rule is the foundational principle of Clean Architecture: source code dependencies must point only inward, toward higher-level policies. Nothing in an inner circle can know anything at all about something in an outer circle.

## Definition

> Source code dependencies must point only inward, toward higher-level policies. The name of something declared in an outer circle must not be mentioned by the code in an inner circle. That includes functions, classes, variables, or any other named software entity.
> 
> — Robert C. Martin, Clean Architecture

## Why It Matters

The Dependency Rule provides several critical benefits:

- **Protection from change** - External frameworks, databases, and UI technologies change frequently. The Dependency Rule ensures these changes don't cascade into business logic.
- **Testability** - Business logic can be tested without databases, web servers, or external services.
- **Delayed decisions** - You can write and test business logic before choosing a database, web framework, or UI technology.
- **Framework independence** - Your business rules aren't married to a specific framework, making future migrations possible.

## How to Apply

### 1. Identify Your Layers

Define clear boundaries between:
- **Entities** - Enterprise business rules
- **Use Cases** - Application business rules
- **Interface Adapters** - Format conversion
- **Frameworks/Drivers** - External tools

### 2. Use Interfaces/Ports for Cross-Boundary Communication

Inner layers define interfaces (ports) that outer layers implement (adapters):

```typescript
// Inner layer (Use Cases) - defines the interface
interface UserRepository {
  findById(id: string): Promise<User>;
  save(user: User): Promise<void>;
}

// Use case depends only on the interface
class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}
  
  async execute(input: CreateUserInput): Promise<User> {
    // Business logic here - no knowledge of database
    const user = new User(input);
    await this.userRepository.save(user);
    return user;
  }
}
```

### 3. Implement Adapters in Outer Layers

```typescript
// Outer layer - implements the interface
class PostgresUserRepository implements UserRepository {
  constructor(private db: PostgresConnection) {}
  
  async findById(id: string): Promise<User> {
    // Database-specific implementation
    const row = await this.db.query('SELECT * FROM users WHERE id = $1', [id]);
    return this.mapToUser(row);
  }
  
  async save(user: User): Promise<void> {
    await this.db.query(
      'INSERT INTO users (id, name, email) VALUES ($1, $2, $3)',
      [user.id, user.name, user.email]
    );
  }
}
```

### 4. Use Dependency Injection

Pass dependencies from outer layers to inner layers:

```typescript
// Composition root (outermost layer)
const db = new PostgresConnection();
const userRepository = new PostgresUserRepository(db);
const createUserUseCase = new CreateUserUseCase(userRepository);
const userController = new UserController(createUserUseCase);
```

## Common Mistakes

### ❌ Importing Framework Types in Inner Layers

```typescript
// WRONG: Use case knows about Express
import { Request, Response } from 'express';

class CreateUserUseCase {
  async execute(req: Request, res: Response) { // ❌ Framework leakage
    // ...
  }
}
```

### ❌ Direct Database Access from Entities

```typescript
// WRONG: Entity depends on database
import { Database } from './database';

class User {
  async save() {
    await Database.query('INSERT ...'); // ❌ Entity knows about database
  }
}
```

### ❌ Framework Annotations in Domain Models

```typescript
// WRONG: Entity polluted with ORM decorators
@Entity() // ❌ JPA/Hibernate annotation
@Table('users') // ❌ Database concern in entity
class User {
  @Column() // ❌ ORM concern
  name: string;
}
```

## FOE Alignment

The Dependency Rule directly supports FOE principles:

- **Understanding** - Clear dependency direction makes the architecture comprehensible; you can trace how data flows without getting lost in implementation details
- **Confidence** - Changes in outer layers (framework upgrades, database migrations) cannot break inner layers (business logic)
- **Fast Feedback** - Inner layers can be compiled and tested independently, providing immediate feedback on business logic correctness

## Related Methods

- [M201-layer-organization](/docs/external-frameworks/clean-architecture/methods/M201-layer-organization) - Organizing code into concentric layers
- [M202-port-definition](/docs/external-frameworks/clean-architecture/methods/M202-port-definition) - Defining interfaces for external communication
- [M203-adapter-implementation](/docs/external-frameworks/clean-architecture/methods/M203-adapter-implementation) - Implementing ports with specific technologies

## References

- Martin, R. C. (2017). *Clean Architecture: A Craftsman's Guide to Software Structure and Design*. Prentice Hall.
- Martin, R. C. (2012). [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html). The Clean Code Blog.
