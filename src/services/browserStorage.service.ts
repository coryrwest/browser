import {
    PlatformUtilsService,
    StorageService,
} from 'jslib/abstractions';

export default class BrowserStorageService implements StorageService {
    constructor(private platformUtilsService: PlatformUtilsService) {
    }

    get<T>(key: string): Promise<T> {
        if (this.platformUtilsService.isSafari()) {
            // use safari storage
        } else {
            return new Promise((resolve) => {
                chrome.storage.local.get(key, (obj: any) => {
                    if (obj && (typeof obj[key] !== 'undefined') && obj[key] !== null) {
                        resolve(obj[key] as T);
                    } else {
                        resolve(null);
                    }
                });
            });
        }
    }

    save(key: string, obj: any): Promise<any> {
        if (this.platformUtilsService.isSafari()) {
            // use safari storage
        } else {
            return new Promise((resolve) => {
                chrome.storage.local.set({ [key]: obj }, () => {
                    resolve();
                });
            });
        }
    }

    remove(key: string): Promise<any> {
        if (this.platformUtilsService.isSafari()) {
            // use safari storage
        } else {
            return new Promise((resolve) => {
                chrome.storage.local.remove(key, () => {
                    resolve();
                });
            });
        }
    }
}