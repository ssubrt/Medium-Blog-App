import { Link } from "react-router-dom";




interface BlogCardProps {
    authorName:string,
    title:string,
    content:string,
    publishedDate:string,
    id:string
}


const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}:BlogCardProps) => {
  return (
      <Link to={`/post/${id}`}>
        
          <div className="border-b border-slate-400 pb-4 w-screen max-w-screen-md cursor-pointer">



              <div className="flex ">

                  <Avator name={authorName} />

                  <div className="font-extralight pl-2 text-sm  flex justify-center flex-col  ">{authorName}</div>
                  <div className="pl-4 text-sm  flex justify-center flex-col  ">&#8226;</div>
                  <div className=" pl-2 font-thin text-slate-400 text-sm  flex justify-center flex-col  ">{publishedDate}</div>


              </div>

              <div className="font-semibold text-xl pt-2">
                  {title}
              </div>

              <div className="text-md font-thin">
                  {content.slice(0, 100) + " ....."}
              </div>

              <div className="text-slate-500 text-sm font-thin pt-4" >
                  {`${Math.ceil(content.length / 100)} minutes`}
              </div>


          </div>
      </Link>
    )
}

export default BlogCard

export function Avator({ name }: { name: string }) {
    return (

        <div className="relative inline-flex items-center justify-center w-9 h-8 overflow-hidden cursor-pointer bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="text-xl font-extralight text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div>

    )
}