# Cloud Storage ☁️

EliteNest provides a unified storage abstraction layer that supports both local file storage and AWS S3-compatible backends.

## Drivers

The framework uses a driver pattern, allowing you to switch between storage providers without changing your business logic.

- **Local Driver**: Stores files in the server's local file system (best for development).
- **S3 Driver**: Stores files in any S3-compatible bucket (AWS, DigitalOcean Spaces, MinIO).

## Configuration

Set your storage driver in the `.env` file:

```bash
STORAGE_DRIVER=local # Options: local, s3
STORAGE_ROOT=public/uploads
```

## Usage

Inject the `StorageService` into your class:

```typescript
constructor(private readonly storage: StorageService) {}
```

// Delete a file
await this.storage.delete('avatar.png');
```

## API Reference

| Method | Parameters | Return Type | Description |
| :--- | :--- | :--- | :--- |
| `get(path: string)` | `path` | `Promise<Buffer>` | Retrieves the raw file content from storage. |
| `put(path, data)` | `path`, `Buffer \| string` | `Promise<string>` | Saves a file to the configured storage root. Returns the relative path. |
| `delete(path: string)` | `path` | `Promise<void>` | Removes a file from storage. |
| `exists(path: string)` | `path` | `Promise<boolean>` | Checks if a file exists in the storage backend. |

## S3-Specific Configuration

If using the S3 driver, you must also provide:
- `S3_BUCKET`
- `S3_REGION`
- `S3_ACCESS_KEY`
- `S3_SECRET_KEY`
- `S3_ENDPOINT` (Alternative for MinIO)
