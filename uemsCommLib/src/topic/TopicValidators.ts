import { BaseSchema } from "../BaseSchema";
import { MessageValidator } from "../messaging/MessageValidator";

export namespace TopicValidators {

    import CORE_SCHEMA = BaseSchema.CORE_SCHEMA;
    import CoreSchema = BaseSchema.CoreSchema;
    import CORE_REQUIRED = BaseSchema.CORE_REQUIRED;
    import CoreSchemaWithStatus = BaseSchema.CoreSchemaWithStatus;
    import Intentions = BaseSchema.Intentions;

    export const TOPIC_REPRESENTATION = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            "id",
            "name",
            "color",
            "icon",
            "description",
        ],
        "properties": {
            "id": {
                "type": "string",
                "description": ""
            },
            "description": {
                "type": "string",
                "description": "",
            },
            "name": {
                "type": "string",
                "description": ""
            },
            "color": {
                "type": "string",
                "pattern": "^#?([0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?)$"
            },
            "icon": {
                "type": "string",
                "description": ""
            }
        }
    }

    export type TopicRepresentation = {
        id: string,
        name: string,
        color: string,
        icon: string,
        description: string,
    };

    export const TOPIC_CREATE_SCHEMA = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            ...CORE_REQUIRED,
            "name",
            "color",
            "icon"
        ],
        "properties": {
            ...CORE_SCHEMA('CREATE'),
            "name": {
                "type": "string",
                "description": ""
            },
            "color": {
                "type": "string",
                "pattern": "^#?([0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?)$"
            },
            "icon": {
                "type": "string",
                "description": ""
            },
            "description": {
                "type": "string",
                "description": "",
            },
        }
    }

    export type TopicCreateSchema = CoreSchema<'CREATE'> & {
        name: string,
        color: string,
        icon: string,
        description: string,
    };
    export const TOPIC_READ_SCHEMA = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            ...CORE_REQUIRED
        ],
        "properties": {
            ...CORE_SCHEMA('READ'),
            "id": {
                "type": "string",
                "description": ""
            },
            "name": {
                "type": "string",
                "description": ""
            },
            "color": {
                "type": "string",
                "pattern": "^#?([0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?)$"
            },
            "icon": {
                "type": "string",
                "description": ""
            },
            "description": {
                "type": "string",
                "description": "",
            },
        }
    }

    export type TopicReadSchema = CoreSchema<'READ'> & {
        id?: string,
        name?: string,
        color?: string,
        icon?: string,
        description?: string,
    };
    export const TOPIC_DELETE_SCHEMA = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            ...CORE_REQUIRED,
            "id"
        ],
        "properties": {
            ...CORE_SCHEMA('DELETE'),
            "id": {
                "type": "string",
                "description": ""
            }
        }
    }

    export type TopicDeleteSchema = CoreSchema<'DELETE'> & {
        id: string,
    };
    export const TOPIC_UPDATE_SCHEMA = {
        "type": "object",
        "additionalProperties": false,
        "minProperties": 2 + CORE_REQUIRED.length,
        "required": [
            ...CORE_REQUIRED,
            "id"
        ],
        "properties": {
            ...CORE_SCHEMA('UPDATE'),
            "id": {
                "type": "string",
                "description": ""
            },
            "name": {
                "type": "string",
                "description": ""
            },
            "color": {
                "type": "string",
                "pattern": "^#?([0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?)$"
            },
            "icon": {
                "type": "string",
                "description": ""
            },
            "description": {
                "type": "string",
                "description": "",
            },
        }
    }

    export type TopicUpdateSchema = CoreSchema<'UPDATE'> & {
        id: string,
        name?: string,
        color?: string,
        icon?: string,
        description?: string,
    };
    const TOPIC_RESPONSE_OBJECT_SCHEMA = {
        "additionalProperties": false,
        "required": [...CORE_REQUIRED, "result"],
        "properties": {
            ...CORE_SCHEMA(['UPDATE', 'CREATE', 'DELETE', 'READ'], true),
            "result": {
                "type": "array",
                "items": {
                    "oneOf": [
                        { ...TOPIC_REPRESENTATION },
                        { "type": "string" }
                    ]
                },
                "description": "The array of matched or manipulated responses",
            },
        },
    };

    export type TopicResponseSchema = CoreSchemaWithStatus<Intentions> & {
        result: string[] | TopicRepresentation[],
    };
    export type TopicMessage = TopicCreateSchema | TopicUpdateSchema | TopicDeleteSchema | TopicReadSchema;

    const TOPIC_MESSAGE_SCHEMA = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "anyOf": [
            TOPIC_CREATE_SCHEMA,
            TOPIC_UPDATE_SCHEMA,
            TOPIC_READ_SCHEMA,
            TOPIC_DELETE_SCHEMA,
        ],
    };

    const TOPIC_RESPONSE_SCHEMA = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "anyOf": [
            TOPIC_RESPONSE_OBJECT_SCHEMA,
        ],
    };

    /**
     * A validator supporting only incoming Topic messages (read, create, delete and update). This uses the default
     * validation scheme as the state schema does not have any additional validation rules
     */
    export class TopicMessageValidator extends MessageValidator {

        constructor() {
            super(TOPIC_MESSAGE_SCHEMA);
        }

        /**
         * Sets up a new message validator
         * @deprecated this is not an async function so you can directly call the constructor. Added for compatibility
         */
        static async setup() {
            return new TopicMessageValidator();
        }

    }

    /**
     * A validator supporting only outgoing messages
     */
    export class TopicResponseValidator extends MessageValidator {

        constructor() {
            super(TOPIC_RESPONSE_SCHEMA);
        }

        /**
         * Sets up a new message validator
         * @deprecated this is not an async function so you can directly call the constructor. Added for compatibility
         */
        static async setup() {
            return new TopicResponseValidator();
        }

    }

    /**
     * Converts a message to JSON applying any additional manipulations, if required
     * @param message the message to convert to JSON
     */
    export const messageToJSON = (message: TopicMessage) => JSON.stringify(message);

}
