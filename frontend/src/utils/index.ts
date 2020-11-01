import { Paste } from '../models/Paste';

// Check if paste has non-empty title and content
export const validatePaste = (paste: Paste): boolean => {
    return paste.title.trim().length > 0 && paste.content.trim().length > 0;
}

// Convert JSON data from api responses into Paste objects
export const convertToPaste = (data: any): Paste => {
    const newPaste: Paste = {
        pasteUrl: data.pasteUrl,
        title: data.title,
        content: data.content,
        ttl: data.ttl,
        timestamp: data._ts
    };
    return newPaste;
}