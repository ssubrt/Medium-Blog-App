import { Blog } from "../hooks"
import Appbar from "./Appbar"
import { Avator } from "./BlogCard"





export const FullBlog = ({blog}: {blog: Blog} ) => {
    return (
        <div>
            <Appbar />

            <div className="flex justify-center">

                <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl ">
                    <div className=" col-span-8">
                        <div className="text-5xl underline font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-500">
                            Posted on 30 Aug 2024
                        </div>

                        <div className="pt-2 text-slate-400">
                            {blog.content}
                        </div>

                    </div>

                    <div className="col-span-4 text-slate-800">
                        Author
                        <div className="flex w-full">
                            <div className="pr-4 flex flex-col justify-center">
                                <Avator name={blog.author.name || "Anonymous"} />
                            </div>
                            
                            <div  >
                                <div className="text-xl font-bold ">{blog.author.name || "Anonymous"}</div>

                                <div className="pt-2 text-slate-500">
                                    Random Catch phrase about the author's ability to grab the user's attention
                                </div>
                            </div>

                        </div>


                    </div>
                    

                </div>

            </div>
        </div>
    )
}