import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import fs from 'fs-extra';
import path from 'path';

export interface IStorageDriver {
    upload(file: Buffer, fileName: string): Promise<string>;
    delete(fileName: string): Promise<void>;
    getUrl(fileName: string): string;
}

@Injectable()
export class StorageService {
    private driver: IStorageDriver;

    constructor(private config: ConfigService) {
        const driverType = this.config.get('STORAGE_DRIVER');
        if (driverType === 's3') {
            // S3 implementation will be added here
            this.driver = new LocalDriver();
        } else {
            this.driver = new LocalDriver();
        }
    }

    async upload(file: Buffer, fileName: string): Promise<string> {
        return this.driver.upload(file, fileName);
    }

    async delete(fileName: string): Promise<void> {
        return this.driver.delete(fileName);
    }

    getUrl(fileName: string): string {
        return this.driver.getUrl(fileName);
    }
}

class LocalDriver implements IStorageDriver {
    private uploadDir: string;

    constructor() {
        this.uploadDir = path.join(process.cwd(), 'uploads');
        fs.ensureDirSync(this.uploadDir);
    }

    async upload(file: Buffer, fileName: string): Promise<string> {
        const filePath = path.join(this.uploadDir, fileName);
        await fs.writeFile(filePath, file);
        return fileName;
    }

    async delete(fileName: string): Promise<void> {
        const filePath = path.join(this.uploadDir, fileName);
        if (await fs.pathExists(filePath)) {
            await fs.remove(filePath);
        }
    }

    getUrl(fileName: string): string {
        return `/uploads/${fileName}`;
    }
}
