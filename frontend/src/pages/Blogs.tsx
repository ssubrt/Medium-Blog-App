
import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";
import BlogSkeleton from "../components/BlogSkeleton";






const Blogs = () => {

  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div className="flex flex-col justify-center items-center h-screen">
      {/* <Triangle
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      /> */}

      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
    </div>
  }

  

  return (
    <div>
      <Appbar />
      <div className="flex justify-center ">

        <div className="pl-4">

          {blogs.map((blog) =>
            <BlogCard
            key={blog.id}
             id={blog.id}
              authorName={blog.author.name || "Annonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate={`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`}
            />
          )}


        </div>

      </div>
    </div>

  )
}

export default Blogs;