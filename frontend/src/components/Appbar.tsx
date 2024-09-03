

import { Link } from 'react-router-dom'
import { Avator } from './BlogCard'



const Appbar = () => {
  return (
    <div className='border-b flex justify-between px-10 py-4 mb-4 '>
      <Link to={'/blogs'} className='flex flex-col justify-center cursor-pointer font-bold italic'>
        
          Medium
       
      </Link>

      <div>

        <Link to={"/publish"} >
          <button type="button" className="text-white mr-4 bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full 
                   text-sm px-5 py-2.5 text-center me-2 mb-2">
            New
          </button>
        </Link>


        <Avator name='Subrat' />
      </div>

    </div>
    
  )
}

export default Appbar