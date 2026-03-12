export const typeDefs = `#graphql
  enum QuestionType {
    TEXT
    MULTIPLE_CHOICE
    CHECKBOX
    DATE
  }

  type Option {
    id: ID!
    value: String!
  }
  
  type Question {
    id: ID!
    title: String!
    type: QuestionType!
    options: [Option!]
    required: Boolean!
  }
  type  Form {
    id: ID!
    title: String!
    description: String!
    questions: [Question!]!
    createdAt: String!
  }
  type Answer {
    questionId: ID!
    value: [String!]!
  }
  type Response {
    id: ID!
    formId: ID!
    answers: [Answer!]!
    submittedAt: String!
  }
  input OptionInput {
    value: String!
  }
  input QuestionInput {
    title: String!
    type: QuestionType!
    options: [OptionInput!]
    required: Boolean!
  }
  input AnswerInput {
    questionId: ID!
    value: [String!]!
  }

  type Query {
    forms: [Form!]!
    form(id: ID!): Form
    responses(formId: ID!): [Response!]!
  }
  type Mutation {
    createForm(title: String!, description: String, questions: [QuestionInput!]): Form!
    submitResponse(formId: ID!, answers: [AnswerInput!]!): Response!
  }
`;
