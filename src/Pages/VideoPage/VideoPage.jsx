import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { addToHistory } from '../../actions/History';
import { viewVideo } from '../../actions/video';
import { addpoints } from '../../actions/points';
import LikeWatchLaterSaveBtns from './LikeWatchLaterSaveBtns';
import Comments from '../../Components/Comments/Comments';
import './VideoPage.css';

const VideoPage = () => {
  const { vid } = useParams();
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(true);
  const [gestureTimeout, setGestureTimeout] = useState(null);
  const [gestureCount, setGestureCount] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [holdTimer, setHoldTimer] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const clickTimeoutRef = useRef(null);

  const vids = useSelector(state => state.VideoReducer);
  const vv = vids?.data.filter(q => q._id === vid)[0];
  const CurrentUser = useSelector((state) => state?.currentUserReducer);

  const handleHistory = useCallback(() => {
    dispatch(addToHistory({ videoId: vid, Viewer: CurrentUser?.result._id }));
  }, [dispatch, vid, CurrentUser]);

  const handleViews = useCallback(() => {
    dispatch(viewVideo({ id: vid }));
  }, [dispatch, vid]);

  const handleTimeUpdate = useCallback(() => {
    setCurrentTime(videoRef.current.currentTime);
  }, []);

  useEffect(() => {
    if (CurrentUser) {
      handleHistory();
    } 
    handleViews();
    if (CurrentUser?.result._id) {
      dispatch(addpoints(CurrentUser.result._id));
    }
    videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [dispatch, CurrentUser, vid, handleHistory, handleViews, handleTimeUpdate]);

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error("Error attempting to play the video:", error);
      });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleGesture = useCallback((gestureType, clickCount) => {
    console.log("Gesture detected:", gestureType, "Click count:", clickCount); // Debugging statement

    switch (clickCount) {
      case 1:
        if (gestureType === 'center') {
          handlePlayPause();
        } else if (gestureType === 'topright') {
          fetchWeatherData();
        }
        break;
      case 2:
        gestureType === 'left' ? videoRef.current.currentTime -= 10 : videoRef.current.currentTime += 10;
        break;
      case 3:
        if (gestureType === 'center') {
          handleNextVideo();
        } else if (gestureType === 'left') {
          document.querySelector('.comments-videopage').scrollIntoView();
        } else if (gestureType === 'right') {
          window.open("about:blank", "_self");
          window.close();
        }
        break;
      default:
        break;
    }
  }, [handlePlayPause]);

  const handleNextVideo = () => {
    const currentIndex = vids?.data.findIndex(q => q._id === vid);
    const nextIndex = (currentIndex - 1) % vids?.data.length;
    const nextVideoId = vids?.data[nextIndex]._id;
    navigate(`/videopage/${nextVideoId}`);
  };

  const fetchWeatherData = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const apikey = '3b31f12c3d237983db59c9ec0fab6b3f';
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`)
          .then(response => response.json())
          .then(data => alert(`Location: ${data.name} Weather: ${data.weather[0].main} Temperature: ${data.main.temp}°C`))
          .catch(error => console.error("Error fetching weather data:", error));
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleHoldStart = (side) => {
    console.log("Hold start on side:", side); 
    setHoldTimer(setTimeout(() => {
      if (side === 'left') {
        videoRef.current.playbackRate = 0.5;
      } else if (side === 'right') {
        videoRef.current.playbackRate = 2.0;
      }
    }, 500)); 
  };

  const handleHoldEnd = () => {
    console.log("Hold end"); 
    clearTimeout(holdTimer);
    videoRef.current.playbackRate = 1.0;
  };

  const handleProgress = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const showVideoControls = () => {
    setShowControls(true);
    clearTimeout(gestureTimeout);
    setGestureTimeout(setTimeout(() => setShowControls(false), 3000)); 
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleClick = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    setClickCount(prevCount => {
      const newCount = prevCount + 1;
      clearTimeout(clickTimeoutRef.current);
  
      clickTimeoutRef.current = setTimeout(() => {
        let gestureType;
  
        if (newCount === 1) {
          if (x >= window.innerWidth * 0.75 && y < window.innerHeight * 0.50) {
            gestureType = 'topright';
          } else {
            gestureType = 'center';
          }
        } else if (newCount === 2) {
          gestureType = x < window.innerWidth / 2 ? 'left' : 'right';
        } else if (newCount === 3) {
          if (x < window.innerWidth * 0.33) {
            gestureType = 'left';
          } else if (x > window.innerWidth * 0.60) {
            gestureType = 'right';
          } else {
            gestureType = 'center';
          }
        }
        handleGesture(gestureType, newCount);
        setClickCount(0); 
      }, 300);
  
      return newCount;
    });
  };

  return (
    <div className="container-videopage">
      <div className="container2-videopage">
        <div className="video-display-screen-videopage">
          <video
            ref={videoRef}
            //src={`http://localhost:5500/${vv?.filePath}`}
            src={`https://ytbackend-u14j.onrender.com/${vv?.filePath}`}
            className={'video-showvideo-videopage'}
            controls={false}
            autoPlay
            onClick={handleClick}
            onContextMenu={(e) => e.preventDefault()}
            onMouseDown={(e) => {
              if (e.button === 0) {
                handleHoldStart(e.clientX < window.innerWidth / 2 ? 'left' : 'right');
              }
            }}
            onMouseUp={handleHoldEnd}
            onProgress={handleProgress}
            onLoadedMetadata={handleLoadedMetadata}
          />
          {showControls && (
            <div className="video-controls">
              <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={handleSeek}
              />
              <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>
          )}
          <div className="video-details-videopage">
            <div className="video-btns-title-videopage-cont">
              <p className='video-title-videopage'>{vv?.videoTitle}</p>
              <div className="views-date-btns-videopage">
                <div className="views-videopage">
                  {vv?.Views} views <div className="dot"></div> {moment(vv?.createdAt).fromNow()}
                </div>
                <LikeWatchLaterSaveBtns vv={vv} vid={vid} />
              </div>
            </div>
            <Link to={`/channel/${vv?.videoChannel}`} className="channel-details-videopage">
              <b className='channel-logo-videopage'>
                <p>{vv?.Uploader.charAt(0).toUpperCase()}</p>
              </b>
              <p className='channel-name-videopage'>{vv?.Uploader}</p>
            </Link>
            <div className="comments-videopage">
              <h2>
                <u>Comments</u>
              </h2>
              <Comments videoId={vv._id} />
            </div>
          </div>
        </div>
        <div className="moreVideobar">
          More Videos
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
