import React, {useRef, useState} from "react";
import { submitComment } from "../services";

const CommentsForm = ( { slug } ) => {
	const [ error, setError ] = useState(false)
	const [ showSuccessMessage, setShowSuccessMessage ] = useState(false)

	const nameEL = useRef();
	const emailEL = useRef();
	const commentEL = useRef();


	const  handleCommentSubmit = () => {
		setError(false)
		const { value:comment } = commentEL.current
		const { value:name } = nameEL.current
		const { value:email } = emailEL.current
	
		if(!comment || !name || !email) {
			setError(true);
			return;
		}
		const commentData = {
			name,
			email,
			comment,
			slug,
		}

		submitComment(commentData).then((res)=>{
			setShowSuccessMessage(true)
			setTimeout(() => {
				setShowSuccessMessage(false)
			}, 3000);
		})
	}
	// nameEL.current.value
	return (
		<div className="bg-white shadow-lg rounded-lg p-8 -b-12 mb-8">
			<h3 className="text-xl mb-8 font-semibold border-b pb-4">
				Leave a Reply
			</h3>
			<div className="grid grid-cols-1 gap-4 mb-4">
				<textarea
					ref={commentEL}
					name="comment"
					placeholder="Comment"
					className="p-4 outline-none w-ful rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
				>

				</textarea>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
				<input
					ref={nameEL}
					type="text"
					placeholder="Name"
					className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
				/>
				<input
					ref={emailEL}
					type="email"
					placeholder="Email"
					className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
				/>
			</div>
			{ error && <p className="text-xs text-red-500">All field are required</p> }
			<button
				onClick={()=> handleCommentSubmit()}
				type="button"
				className="transition duration-500 ease-in hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
			>
				Post Commnet
			</button>
			{ showSuccessMessage && (
				<span className="text-xl float-right font-semibold mt-3 text-green-500">
					Comment Submitted for review
				</span>
			)
		}
		</div>
	)
}

export default CommentsForm