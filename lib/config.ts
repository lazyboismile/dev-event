/** IMAGE CONFIGURATION (config.js) */

import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const validMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];

export const getSerialForImage = (filename: string) => {
    const ext = path.parse(filename).ext;
    return uuidv4() + ext;
};

// DATABASE CONNECTION URL

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
