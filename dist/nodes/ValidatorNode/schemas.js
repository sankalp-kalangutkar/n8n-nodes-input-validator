"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemas = void 0;
exports.schemas = {
    string: { type: 'string' },
    number: { type: 'number' },
    boolean: { type: 'boolean' },
    date: { type: 'string', format: 'date-time' },
    enum: { type: 'string', enum: [] },
    email: { type: 'string', format: 'email' },
    url: { type: 'string', format: 'url' },
    uuid: { type: 'string', format: 'uuid' },
};
//# sourceMappingURL=schemas.js.map