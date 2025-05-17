export const USER_TOKENS = {
    SERVICES: {
        QUERY: Symbol('USER_QUERY_SERVICE'),
        COMMAND: Symbol('USER_COMMAND_SERVICE'),
    },
    REPOSITORIES: {
        QUERY: Symbol('USER_QUERY_REPOSITORY'),
        COMMAND: Symbol('USER_COMMAND_REPOSITORY'),
    },
} as const;
