// Type definitions for express-graphql 0.8
// Project: https://github.com/graphql/express-graphql
// Definitions by: Isman Usoh <https://github.com/isman-usoh>
//                 Nitin Tutlani <https://github.com/nitintutlani>
//                 Daniel Fader <https://github.com/hubel>
//                 Ehsan Ziya <https://github.com/zya>
//                 Margus Lamp <https://github.com/mlamp>
//                 Firede <https://github.com/firede>
//                 Ivan Goncharov <https://github.com/IvanGoncharov>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.6

import { Request, Response } from "express";
import {
    ExecutionArgs,
    ExecutionResult,
    DocumentNode,
    GraphQLSchema,
    GraphQLError,
    GraphQLFieldResolver,
    ValidationContext,
    ASTVisitor,
} from "graphql";
export = graphqlHTTP;

declare namespace graphqlHTTP {
    /**
     * Used to configure the graphqlHTTP middleware by providing a schema
     * and other configuration options.
     *
     * Options can be provided as an Object, a Promise for an Object, or a Function
     * that returns an Object or a Promise for an Object.
     */
    export type Options =
        | ((request: Request, response: Response, params?: GraphQLParams) => OptionsResult)
        | OptionsResult;
    export type OptionsResult = OptionsData | Promise<OptionsData>;
    export interface OptionsData {
        /**
         * A GraphQL schema from graphql-js.
         */
        schema: GraphQLSchema;

        /**
         * A value to pass as the context to the graphql() function.
         */
        context?: any;

        /**
         * An object to pass as the rootValue to the graphql() function.
         */
        rootValue?: any;

        /**
         * A boolean to configure whether the output should be pretty-printed.
         */
        pretty?: boolean | null;

        /**
         * An optional array of validation rules that will be applied on the document
         * in additional to those defined by the GraphQL spec.
         */
        validationRules?: Array<(ctx: ValidationContext) => ASTVisitor> | null;

        /**
         * An optional function which will be used to validate instead of default `validate`
         * from `graphql-js`.
         */
        customValidateFn?: ((
          schema: GraphQLSchema,
          documentAST: DocumentNode,
          rules: ReadonlyArray<any>,
        ) => ReadonlyArray<GraphQLError>) | null;

        /**
         * An optional function which will be used to execute instead of default `execute`
         * from `graphql-js`.
         */
        customExecuteFn?: ((args: ExecutionArgs) => Promise<ExecutionResult>) | null;

        /**
         * An optional function which will be used to format any errors produced by
         * fulfilling a GraphQL operation. If no function is provided, GraphQL's
         * default spec-compliant `formatError` function will be used.
         */
        customFormatErrorFn?: ((error: GraphQLError) => any) | null;

        /**
         * `formatError` is deprecated and replaced by `customFormatErrorFn`. It will
         *  be removed in version 1.0.0.
         */
        formatError?: ((error: GraphQLError) => any) | null;

        /**
         * An optional function for adding additional metadata to the GraphQL response
         * as a key-value object. The result will be added to "extensions" field in
         * the resulting JSON. This is often a useful place to add development time
         * info such as the runtime of a query or the amount of resources consumed.
         *
         * Information about the request is provided to be used.
         *
         * This function may be async.
         */
        extensions?: ((info: RequestInfo) => { [key: string]: any }) | null;

        /**
         * A boolean to optionally enable GraphiQL mode.
         */
        graphiql?: boolean | null;

        /**
         * A resolver function to use when one is not provided by the schema.
         * If not provided, the default field resolver is used (which looks for a
         * value or method on the source value with the field's name).
         */
        fieldResolver?: GraphQLFieldResolver<any, any> | null;
    }

    /**
     * All information about a GraphQL request.
     */
    export interface RequestInfo {
        /**
         * The parsed GraphQL document.
         */
        document: DocumentNode | null | undefined;

        /**
         * The variable values used at runtime.
         */
        variables: { [name: string]: any } | null | undefined;

        /**
         * The (optional) operation name requested.
         */
        operationName: string | null | undefined;

        /**
         * The result of executing the operation.
         */
        result: any;

        /**
         * A value to pass as the context to the graphql() function.
         */
        context?: any;
    }

    export interface GraphQLParams {
        query: string | null | undefined;
        variables: { [name: string]: any } | null | undefined;
        operationName: string | null | undefined;
        raw: boolean | null | undefined;
    }

    type Middleware = (request: Request, response: Response) => Promise<undefined>;
}

/**
 * Middleware for express; takes an options object or function as input to
 * configure behavior, and returns an express middleware.
 */
declare function graphqlHTTP(options: graphqlHTTP.Options): graphqlHTTP.Middleware;
