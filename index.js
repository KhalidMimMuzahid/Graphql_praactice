import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";


// data
import db from './_db.js'
// types
import { typeDefs } from "./schema.js";

// resolvers
const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    game(_, args) {
      return db.games.find((game) => game.id === args.id);
    },
    authors() {
      return db.authors;
    },
    author(_, args) {
      return db.authors.find((author) => author.id === args.id);
    },
    reviews() {
      return db.reviews;
    },
    review(_, args) {
      return db.reviews.find((review) => review.id === args.id);
    },
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter((each) => each.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((each) => each.game_id === parent.id);
    },
  },
  Review: {
    game(parent) {
      return db.games.find((each) => each.id === parent.game_id);
    },
    author(parent) {
      return db.authors.find((each) => each.id === parent.author_id);
    },
  },
  Mutation: {
    addGame(_, args) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString(),
      };
      db.games.push(game);

      return game;
    },
    deleteGame(_, args) {
      db.games = db.games.filter((each) => each.id !== each.id);
      return db.games;
    },
    updateGame(_, args) {
      db.games = db.games.map((each) => {
        if (each.id === args.id) {
          return { ...each, ...args.game };
        }
        return each;
      });
      return db.games.find((each) => each.id === args.id);
    },
  },
};

// server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at: ${url}`);

{
  // ExampleQuery all
  // query ExampleQuery {
  //   games {
  //     id,
  //     title,
  //     platform,
  //     reviews {
  //       id,
  //       rating,
  //       author {
  //         name
  //       },
  //     }
  //   }
  // }
  //   authors {
  //     name,
  //     verified,
  //     id
  //   }
  //   reviews {
  //     id
  //   }
  // }
}
{
  // ExampleQuery by id
  // query ExampleQuery($id: ID!) {
  //   game(id: $id) {
  //     id,
  //     title,
  //     platform,
  //     reviews {
  //       id,
  //       rating,
  //       content
  //     }
  //   }
  //   author(id: $id) {
  //     id,
  //     name,
  //     reviews {
  //       id,
  //       rating,
  //       content
  //       rating
  //     }
  //   }
  //   review(id: $id) {
  //     id,
  //     rating,
  //     content,
  //     game {
  //       id,
  //       platform,
  //       title
  //     },
  //     author {
  //       id,
  //       name,
  //       verified
  //     }
  //   }
  // }
  // //inside Variable
  // {
  //   "id": "3"
  // }
}
{
  //DeleteGameMutation
  // mutation DeleteGameMutation($id: ID!){
  //   deleteGame(id: $id){
  //     id,
  //     title,
  //     platform,
  //   }
  // }
  // //inside Variable
  // {
  //   "id": "3"
  // }
}
{
  // AddGameMutation
  // mutation AddGameMutation($game: AddGameInput!){
  //   addGame(game: $game) {
  //     id,
  //     title,
  //     platform
  //   }
  // }
  // //inside Variable
  // {
  //   "game": {
  //     "title": "title name",
  //     "platform": ["X-BOW", "Unity"]
  //   }
  // }
}

{
  // UpdateGameMutation
  // mutation UpdateGameMutation($id: ID!, $game: UpdateGameInput! ){
  //   updateGame(id: $id, game: $game) {
  //     id,
  //     title,
  //     platform
  //   }
  // }
  // //inside Variable
  // {
  //   "id": "3",
  //   "game": {
  //     "title": "title namexx",
  //     "platform": ["X-BOWxx", "Unityxx"]
  //   }
  // }
}