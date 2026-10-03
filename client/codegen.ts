import type { CodegenConfig } from '@graphql-codegen/cli';
import { typeDefs } from '../server/src/shema/typeDefs';

const config: CodegenConfig = {
  schema: typeDefs,
  documents: ['src/entities/**/*.graphql', 'src/features/**/*.graphql'],
  generates: {
    'src/shared/api/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: { enumsAsTypes: true, useTypeImports: true },
    },
  },
};

export default config;
