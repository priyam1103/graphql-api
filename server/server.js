const express = require("express");
const {graphqlHTTP} = require("express-graphql"); 
const app = express();
const PORT = 3005;
const mongoose = require("mongoose");
const schema = require("./schema/schema")
const cors = require("cors");

app.use(cors())
mongoose.connect("mongodb://localhost:27017/graphql", { useNewUrlParser: true }).then(() => {
    console.log("connected to db")
})
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(PORT, () => {
    console.log(`connect at ${PORT}`)
})