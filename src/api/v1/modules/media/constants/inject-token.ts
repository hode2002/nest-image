export const MEDIA_TOKENS = {
    PROVIDERS: {
        CLOUDINARY: Symbol('CLOUDINARY_PROVIDER'),
    },
    SERVICES: {
        QUERY: Symbol('MEDIA_QUERY_SERVICE'),
        COMMAND: Symbol('MEDIA_COMMAND_SERVICE'),
    },
} as const;
