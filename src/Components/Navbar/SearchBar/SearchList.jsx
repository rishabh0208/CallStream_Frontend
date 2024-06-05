import React from 'react'
import './SearchList.css'
import { FaSearch } from 'react-icons/fa'

const SearchList = ({TitleArray,setsearchQuery}) => {
  return (
    <>
      <div className="Container-searchlist">
        {
            TitleArray.map(m=>{
                return <p 
                key={m}
                onClick={e=>setsearchQuery(m)}
                className='titleItem'>

                <FaSearch/>
                {m}
            </p>
            })
        }
        
    
      </div>
    </>
  )
}

export default SearchList
