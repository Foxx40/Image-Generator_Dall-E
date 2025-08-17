import React from 'react'
import { download } from '../assets'
import {downloadImage} from '../utils'
const Card = ({_id , name , prompt , photo}) => {
  return (
    <div className='rounded-xl group relative shadow-card hover:shadow-cardhover'>
   <img
    src={photo} alt={prompt} className='w-full h-auto object-cover rounded-xl'/>
    <div className='group-hover:flex flex-col max-h-[94%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md'>

 <p className='text-white font-medium'>
    {prompt}
 </p>
 <div className='flex items-center gap-2 mt-5 justify-between '>
<div className='flex items-center gap-2'>
<div className='w-8 h-8 rounded-full bg-[#ecEcF1] flex items-center justify-center font-bold'>
  a
</div>
<p className='text-white font-medium' >{name}</p>
</div>

<button type='button' className='w-full font-medium bg-[#ecEcF1] py-2 px-4 rounded-md text-black' onClick={()=>downloadImage(_id,photo)}>
  Download
</button>
 </div>
    </div>
    </div>
  )
}

export default Card
