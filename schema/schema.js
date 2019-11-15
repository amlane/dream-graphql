const graphql = require("graphql");
const _ = require("lodash");
const User = require("../models/user");
const Dream = require("../models/dream");

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema
} = graphql;

const DreamType = new GraphQLObjectType({
    name: "Dream",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        created_at: { type: GraphQLString },
        category: { type: GraphQLString }
    })
})

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        sub: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        created_at: { type: GraphQLString },
        dreams: {
            type: new GraphQLList(DreamType),
            resolve(parent, args) {
                return Dream.find({ user_id: parent.id })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find();
            }
        },
        user: {
            type: UserType,
            args: { sub: { type: GraphQLString } },
            resolve(parent, args) {
                return User.findOne({ sub: args.sub })
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                sub: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let user = new User({
                    sub: args.sub,
                    name: args.name,
                    email: args.email
                })
                return user.save();
            }
        },
        addDream: {
            type: DreamType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                content: { type: new GraphQLNonNull(GraphQLString) },
                category: { type: new GraphQLNonNull(GraphQLString) },
                user_id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let dream = new Dream({
                    title: args.title,
                    content: args.content,
                    category: args.category,
                    user_id: args.user_id
                })
                return dream.save();
            }
        },
        editDream: {
            type: DreamType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: new GraphQLNonNull(GraphQLString) },
                content: { type: new GraphQLNonNull(GraphQLString) },
                category: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Dream.findByIdAndUpdate(args.id, {
                    title: args.title,
                    content: args.content,
                    category: args.category,
                    user_id: args.user_id
                }, (err) => {
                    if (err) {
                        return next(err);
                    }
                })
            }
        },
        removeDream: {
            type: DreamType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                const delDream = Dream.findByIdAndRemove(args.id).exec();
                if (!delDream) {
                    throw new Error("Error!");
                }
                return delDream;
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});