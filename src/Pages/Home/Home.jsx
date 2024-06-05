import React from 'react'
import './Home.css'
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar'
import ShowVideoGrid from '../../Components/ShowVideoGrid/ShowVideoGrid'
//import video from '../../Components/Video/video.mp4'
//import video2 from '../../Components/Video/video2.MP4'
import { useSelector } from 'react-redux'
const Home = () => {
  const vids=useSelector(state=>state.VideoReducer)?.data?.filter(q=>q).reverse();
  //console.log(videosFile);
  // const vids=[
  //   {
  //     _id:1,
  //     video_src: video,
  //     Chanel:"62bafe6752cea35a6c30685f",
  //     Uploader: "abc",
  //     title:"video 1",
  //     description:"description of video 1",
  //   },
  //   {
  //     _id:2,
  //     video_src:  video2,
  //     Chanel:"cdd",
  //     Uploader: "abc",
  //     title:"video 2",
  //     description:"description of video 2",
  //   },
  //   {
  //     _id:3,
  //     video_src:  video,
  //     Chanel:"add",
  //     Uploader: "abc",
  //     title:"video 3",
  //     description:"description of video 3",
  //   },
  //   {
  //     _id:4,
  //     video_src:  video2,
  //     Chanel:"sdd",
  //     Uploader: "abc",
  //     title:"video 4",
  //     description:"description of video 4",
  //   }
    
  // ];

  const NavList=[
    "All","Python","Java","C++", "Movies","Science","Animation","Gaming","Comedy","Tanmay","Rohit Sharma","IPL","Mumbai Indians","BJPf"
  ]

  return (
    <div className='container-pages-app'>
        <LeftSideBar/>
        <div className="container2-pages-app">
          <div className="navigation-home">
            {
              NavList.map(m=> {
                return (
                <p key={m}className='btn-nav-home'>
                  {m}
                </p> )
              })
            }
          </div>
            <ShowVideoGrid vids={vids} />
        </div>
        
    </div>
  )
}

export default Home
