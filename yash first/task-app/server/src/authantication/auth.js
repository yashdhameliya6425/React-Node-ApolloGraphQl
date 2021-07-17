import { defaultFieldResolver } from "graphql"

import { SchemaDirectiveVisitor } from 'apollo-server-express'

class IsAuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field;
        field.resolve = async function (...args) {
            const context = args[2];
            if (!context.me) {
                throw new AuthenticationError('Unauthenticated User.')
            }
            const result = await resolve.apply(this, args);
            return result;
        };
    }
}

export default IsAuthDirective