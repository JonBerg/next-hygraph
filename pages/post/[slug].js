import React from "react";
import { getPostDetails} from "../../services"
import { PostDetail, Authors, CommentsForm, Comments } from "../../components";

const PostDetails = ( { post } ) => {
	return (
		<div className="container mx-auto px-10 mb-8">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
				<div className="cal-span-1 lg:col-span-8">
					{/* PostDetails */}
					<PostDetail post={ post }/>
					{/* Author */}
					<Authors author={ post.author } />
					{/* CommentsForm */}
					<CommentsForm slug={ post.slug }/>
					{/* Comments */}
					<Comments slug={ post.slug }/>
				</div>
			</div>
			
		</div>
	)
}

export default PostDetails

export const getServerSideProps = async({params})=> {
	const data = await getPostDetails(params.slug)

	return {
		props:{
			post: data,
		}
	}
}