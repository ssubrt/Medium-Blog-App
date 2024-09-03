import { Triangle } from "react-loader-spinner";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import Appbar from "../components/Appbar";



const Blog = () => {
  const { id }  = useParams();
  const { loading, blog } = useBlog({
    id: id || ""
  });

  if (loading || !blog) {
    return (
      <div >
        <Appbar />

        <div className="flex flex-col justify-center items-center h-screen">

          <Triangle
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />

          {/* <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton /> */}
        </div>
      </div>
    )
  }
  return (
    <div>

      <FullBlog blog={blog} />

    </div>


  )
}

export default Blog