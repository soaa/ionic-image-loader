import { HttpClient } from '@angular/common/http';
import { File, FileEntry } from '@ionic-native/file';
import { Platform } from 'ionic-angular';
import { ImageLoaderConfig } from './image-loader-config';
import { Observable } from 'rxjs/Observable';
export interface IndexItem {
    name: string;
    modificationTime: Date;
    size: number;
}
export interface QueueItem {
    imageUrl: string;
    resolve: Function;
    reject: Function;
}
export declare class ImageLoader {
    protected config: ImageLoaderConfig;
    protected file: File;
    protected http: HttpClient;
    protected platform: Platform;
    /**
     * Indicates if the cache service is ready.
     * When the cache service isn't ready, images are loaded via browser instead.
     * @type {boolean}
     */
    protected isCacheReady: boolean;
    /**
     * Indicates if this service is initialized.
     * This service is initialized once all the setup is done.
     * @type {boolean}
     */
    protected isInit: boolean;
    /**
     * Number of concurrent requests allowed
     * @type {number}
     */
    protected concurrency: number;
    /**
     * Queue items
     * @type {Array}
     */
    protected queue: QueueItem[];
    protected processing: number;
    /**
     * Fast accessible Object for currently processing items
     */
    protected currentlyProcessing: {
        [index: string]: Promise<any>;
    };
    protected cacheIndex: IndexItem[];
    protected currentCacheSize: number;
    protected indexed: boolean;
    constructor(config: ImageLoaderConfig, file: File, http: HttpClient, platform: Platform);
    readonly nativeAvailable: boolean;
    protected readonly isCacheSpaceExceeded: boolean;
    protected readonly isWKWebView: boolean;
    protected readonly isIonicWKWebView: boolean;
    protected readonly isDevServer: boolean;
    /**
     * Check if we can process more items in the queue
     * @returns {boolean}
     */
    protected readonly canProcess: boolean;
    /**
     * Preload an image
     * @param {string} imageUrl Image URL
     * @returns {Promise<string>} returns a promise that resolves with the cached image URL
     */
    preload(imageUrl: string): Promise<string>;
    getFileCacheDirectory(): string;
    /**
     * Clears cache of a single image
     * @param {string} imageUrl Image URL
     */
    clearImageCache(imageUrl: string): void;
    /**
     * Clears the cache
     */
    clearCache(): void;
    /**
     * Gets the filesystem path of an image.
     * This will return the remote path if anything goes wrong or if the cache service isn't ready yet.
     * @param {string} imageUrl The remote URL of the image
     * @returns {Promise<string>} Returns a promise that will always resolve with an image URL
     */
    getImagePath(imageUrl: string): Promise<string>;
    /**
     * Returns if an imageUrl is an relative path
     * @param {string} imageUrl
     */
    protected isImageUrlRelative(imageUrl: string): boolean;
    /**
     * Add an item to the queue
     * @param {string} imageUrl
     * @param resolve
     * @param reject
     */
    protected addItemToQueue(imageUrl: string, resolve: any, reject: any): void;
    /**
     * Processes one item from the queue
     */
    protected processQueue(): void;
    /**
     * load fileEntry from url
     * @param imageUrl
     */
    protected loadFileFromUrl(url: string, localDir: string, fileName: string): Observable<FileEntry>;
    /**
     * Search if the url is currently in the queue
     * @param imageUrl {string} Image url to search
     * @returns {boolean}
     */
    protected currentlyInQueue(imageUrl: string): boolean;
    /**
     * Initialize the cache service
     * @param [boolean] replace Whether to replace the cache directory if it already exists
     */
    protected initCache(replace?: boolean): void;
    /**
     * Adds a file to index.
     * Also deletes any files if they are older than the set maximum cache age.
     * @param {FileEntry} file File to index
     * @returns {Promise<any>}
     */
    protected addFileToIndex(file: FileEntry): Promise<any>;
    /**
     * Indexes the cache if necessary
     * @returns {Promise<void>}
     */
    protected indexCache(): Promise<void>;
    /**
     * This method runs every time a new file is added.
     * It checks the cache size and ensures that it doesn't exceed the maximum cache size set in the config.
     * If the limit is reached, it will delete old images to create free space.
     */
    protected maintainCacheSize(): void;
    /**
     * Remove a file
     * @param {string} file The name of the file to remove
     * @returns {Promise<any>}
     */
    protected removeFile(file: string): Promise<any>;
    /**
     * Get the local path of a previously cached image if exists
     * @param {string} url The remote URL of the image
     * @returns {Promise<string>} Returns a promise that resolves with the local path if exists, or rejects if doesn't exist
     */
    protected getCachedImagePath(url: string): Promise<string>;
    /**
     * Throws a console error if debug mode is enabled
     * @param {any[]} args Error message
     */
    protected throwError(...args: any[]): void;
    /**
     * Throws a console warning if debug mode is enabled
     * @param {any[]} args Error message
     */
    protected throwWarning(...args: any[]): void;
    /**
     * Check if the cache directory exists
     * @param directory {string} The directory to check. Either this.file.tempDirectory or this.getFileCacheDirectory()
     * @returns {Promise<boolean|FileError>} Returns a promise that resolves if exists, and rejects if it doesn't
     */
    protected cacheDirectoryExists(directory: string): Promise<boolean>;
    /**
     * Create the cache directories
     * @param replace {boolean} override directory if exists
     * @returns {Promise<DirectoryEntry|FileError>} Returns a promise that resolves if the directories were created, and rejects on error
     */
    protected createCacheDirectory(replace?: boolean): Promise<any>;
    /**
     * Creates a unique file name out of the URL
     * @param {string} url URL of the file
     * @returns {string} Unique file name
     */
    protected createFileName(url: string): string;
    /**
     * Converts a string to a unique 32-bit int
     * @param {string} string string to hash
     * @returns {number} 32-bit int
     */
    protected hashString(string: string): number;
    /**
     * Extract extension from filename or url
     *
     * @param {string} url
     * @returns {string}
     */
    protected getExtensionFromUrl(url: string): string;
}
