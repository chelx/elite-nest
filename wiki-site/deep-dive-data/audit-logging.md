# Asynchronous Audit Logging 📝

EliteNest includes a high-performance auditing system designed for enterprise compliance without sacrificing API performance.

## Key Features
- **Asynchronous**: Logging is "fire and forget", ensuring no impact on request latency.
- **Driver-based**: Supports multiple backends (PostgreSQL, Local Files).
- **Security-first**: Automatically redacts sensitive fields like passwords.
- **Daily Rotation**: File-based logs are automatically rotated to manage disk space.

## Configuration

You can toggle the audit log driver in your `.env` file:

```bash
AUDIT_LOG_DRIVER=file # Options: database, file
AUDIT_LOG_PATH=logs/audit
```

## How it Works

The `AuditService` orchestrates events. When a write operation occurs (usually via `BaseRepository`), an audit event is triggered.

```mermaid
sequenceDiagram
    participant App as Application Service
    participant Repo as BaseRepository
    participant Audit as AuditService
    participant Driver as AuditDriver (File/DB)

    App->>Repo: create(data)
    Repo-->>Audit: log(action, changes)
    Audit-->>Driver: redact(changes)
    Audit-->>Driver: write(entry)
    Note right of Audit: Runs asynchronously (Non-blocking)
    Repo-->>App: return NewRecord
```

## Data Redaction Engine Flow

To ensure PII safety, EliteNest processes all logs through a recursive redaction engine.

```mermaid
graph LR
    Log[Raw Log Entry] --> Engine{Redaction Engine}
    Engine --> KeyCheck{Is key in blacklist?}
    KeyCheck -- YES --> Mask[Replace with '********']
    KeyCheck -- NO --> ObjectCheck{Is value an object?}
    ObjectCheck -- YES --> Recurse[Recursive Call]
    ObjectCheck -- NO --> Keep[Keep Original Value]
    Mask --> Final[Clean Log Entry]
    Keep --> Final
```

## PII Redaction

To comply with privacy standards (GDPR, etc.), EliteNest automatically masks sensitive fields in the `changes` column:

```json
{
  "email": "user@example.com",
  "password": "********"
}
```

The redaction logic searches for keywords like `password`, `token`, `secret`, and `key` recursively within the audit entry.
