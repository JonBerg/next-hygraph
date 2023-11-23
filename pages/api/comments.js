import { GraphQLClient, gql } from "graphql-request"
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function handler(req, res) {
  const graphqlClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
    }
  })
  
  const query = gql`
    mutation  CreateComment($name: String!, $email: String!, $comment: String!, $slug: String! ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment,
          post: {connect: { slug: $slug}}
        }
      ){
        id
      }
    }
  `

  try {
    const result = await graphqlClient.request(query, req.body)
    return res.status(200).send(result);
  } catch (error) {
    console.log("errrrrrrrrrrrorrrrrrrrrr", error);
    return res.status(500).send(error);
  }
}
