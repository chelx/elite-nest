import { AsyncLocalStorage } from 'async_hooks';

export interface TenantContext {
    tenantId: string;
}

export const tenantStorage = new AsyncLocalStorage<TenantContext>();

export function getTenantId(): string | undefined {
    return tenantStorage.getStore()?.tenantId;
}

export function runInTenantContext<T>(tenantId: string, callback: () => T): T {
    return tenantStorage.run({ tenantId }, callback);
}
