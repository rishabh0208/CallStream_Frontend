import React from 'react'
import ShowVideo from '../ShowVideo/ShowVideo'
import './ShowVideoGrid.css'

const ShowVideoGrid = ({vids}) => {
  return (
    <div className='container-showvideogrid'>
      {
        vids?.map(vi=>{
            return (
                <div key={vi._id} className="video-box">
                   <ShowVideo vid={vi} />
                </div>
            )
        })
      }
    </div>
  )
}

export default ShowVideoGrid
