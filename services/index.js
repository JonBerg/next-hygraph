import { gql, request } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
	const query = gql`
		query MyQuery {
			postsConnection {
				edges {
					node {
						author {
							bio
							id
							name
							photo {
								url
							}
						}
						slug
						title
						excerpt
						createdAt
						featuredPost
						stage
						featuredImage {
							url
						}
						catergories {
							name
							slug
						}
					}
				}
			}
		}
	`;

	const result = await request(graphqlAPI, query);

	return result.postsConnection.edges;
}

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
        ){
          title 
          featuredImage {
            url
          }
          createdAt
          slug
        }
    }
  `

  const result = await request(graphqlAPI, query);
  return result.posts;
}

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where:{
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ){
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `

  const result = await request(graphqlAPI, query, {slug, categories});

  return result.posts;
}

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      catergories {
        name
        slug
      }
    }
  `

  const result = await request(graphqlAPI, query);

  return result.catergories;
}

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDeatials($slug: String!) {
      post(where: {slug:$slug}) {
        title
        excerpt
        featuredImage{
          url
        }
        author {
          name
          bio
          photo{
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        catergories {
          name
          slug
        }
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
} 

export const submitComment = async (commentData) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(commentData),
  })

  return result.json();
}

export const getComments = async(slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: {post: {slug: $slug}}){
        name
        createdAt
        comment
      }
    }
  `
  const result = await request(graphqlAPI, query, {slug});

  return result.comments;
}

export const getCategoryPosts = async (slug) => {
	const query = gql`
		query GetCatergoryPost($slug: String!) {
			postsConnection(where: {catergories_some: {slug: $slug}}) {
				edges {
					node {
						author {
							bio
							id
							name
							photo {
								url
							}
						}
						slug
						title
						excerpt
						createdAt
						featuredPost
						stage
						featuredImage {
							url
						}
						catergories {
							name
							slug
						}
					}
				}
			}
		}
	`;

	const result = await request(graphqlAPI, query, { slug });

	return result.postsConnection.edges;
}