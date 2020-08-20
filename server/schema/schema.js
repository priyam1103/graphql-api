const graphql = require("graphql");
const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
GraphQLID} = graphql;

const Book = require("../models/books");
const Author = require("../models/authors");

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
              //  return _.find(authors,{id:parent.authorid})
                return Author.findById({_id:parent.authorid})
            }
        }
    })
})
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    book: {
        type: new GraphQLList(BookType),
        resolve(parent, args) {
            return Book.find({authorid:parent._id})
        }
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
          return Book.findById(args.id)
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
    
          return Author.findById(args.id)
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
      
          return Book.find({})
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
    
          return Author.find({})
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorid: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorid: args.authorid,
        });
        return book.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
})