import React, { useRef, useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from '../Images/any-min-now.png';
import './Events.css'
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { listEvents } from "../actions/eventAction";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from 'react-router-dom';
import axios from "../api/axios";
import { MdSearch } from "react-icons/md";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { MdMic, MdMicOff } from "react-icons/md";
import { border } from "@mui/system";


function Events() { 
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const eventList = useSelector((state) => state.eventList);
  const { loading, error, events } = eventList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [filtered, setFiltered] = useState("");

  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    console.log("ON CHANGE"+ event);
    const Filtered = events.filter(event => {
      return event.Event_ID === 4;
    });
    console.log("Popularity: "+ Filtered?.events?.Event_Name);
    console.log(filtered);
    setFiltered(Filtered);
    // console.log(data);  
    console.log("Filter length: "+filtered.length);
    //if (event)
  };

  useEffect(() => {
    dispatch(listEvents());
    // if (!userInfo) {
    //   navigate('/'); 
    // }
    // const fetchData = async () => {
    //   const res = await axios.post(`http://localhost:3500/auth/find_event/${query}`);
    //   setData(res.data);
    // };
    // if (query.length === 0 || query.length > 2) fetchData();
  }, [
    dispatch,
    navigate,
    userInfo,
  ]);
  console.log("Query: "+query)

const setSetQuery= (value) => {
  if (value.length===0){
    console.log("EMPTY");
    setData([]);
    setErrMsg("");
  }
  // else if (query.length>0 && data?.events?.length===0){
    
  // }
  else{
    setQuery(value);
  }
}

const resetQuery= () => {
    setQuery("");
    setData([]);
    setErrMsg("");
  }
  
  const setPopularity= () => {
    // setQuery("");
    // setData([]);
    // setErrMsg("");
    //var arr = [...events];
    //arr.push()
    // const filtered = events?.filter(event => {
    //   return event.Event_Name === 'party';
    // });
    // console.log("Popularity: "+ filtered);
    //setData(filtered);
  }

  const voiceQuery= (value) => {
    if (value?.length===0)
      console.log("NO VOICE QUERY YET!!!")
    setErrMsg("");
    setQuery(value);
    console.log("Voice Query: "+value)
  }

  const fetchData = async () => {
    try{
    const res = await axios.post(`http://localhost:3500/auth/find_event/${query}`);
    setData(res.data);
    if(data?.length===0){
      setErrMsg("Event Not Found!");
    }
   else if (data?.length>0){
    setErrMsg("")
  }
    } catch(error){
      setErrMsg("Event Not Found!");
        console.log(error)
    }
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  // if (query.length === 0 || query.length > 2) fetchData();
  console.log("Search Data Result:",data.events);

  return (
    <div className="super-event-cont">
      <div className="searchInput">
      
      <a>
      <input
          className="search"
          placeholder="Search..."
          onChange={(e) => setSetQuery(e.target.value)
          
            // setQuery(e.target.value)
          }
          //value={transcript}
          
        /></a>
        {/* <button onClick={() => {resetTranscript(); SpeechRecognition.startListening();}}><MdMic style={{ fontSize: '25px' }} /></button> */}
        <a><button className="searc-btn" onClick={fetchData}><MdSearch style={{ fontSize: '25px' }} />Search</button></a>
        
      
      {/* <button onClick={SpeechRecognition.stopListening}><MdMicOff style={{ fontSize: '25px' }} /></button> */}
      
      </div>
      <div className="reset-query" style={{ marginLeft: "21rem", marginBottom: "20px" }}>
        <button className="search-box" style={{ width: "400px", marginRight: "15px", height: "3rem", boxShadow: "5px 5px 5px gray", borderRadius: "10px" }} onClick={() => { voiceQuery(transcript); fetchData(); }}>
          <div style={{ }}>
            {listening ? 'Search for: ' + transcript : transcript}
            {/* <p>{transcript}</p> */}
          </div>
          
        </button>
        <button className="speech-btn" onClick={() => { SpeechRecognition.startListening(); }}><MdMic style={{ fontSize: '25px' }} /></button>
        <button className="reset-btn" onClick={() => { resetTranscript(); resetQuery(); }}>Reset</button>
      </div>

      {console.log(events)}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <div className="drop-style" style={{position:"absolute", right:"6.5rem", top:"10rem"}}>
      {/* <label htmlFor="dropdown">Select an option:</label> */}
      <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
        <option value="" style={{fontStyle: "italic", fontWeight: "bold"}}>----Filter By----</option>
        <option value="option1">Popularity</option>
        <option value="option2">Favorites</option>
        <option value="option3">Newly Added</option>
      </select>
      {/* <p>You selected: {selectedOption}</p> */}
    </div>
{Array.isArray(data) 
// && data  
  ||  data?.events?.length===0
  || query.length ===0
  //&& filtered.length === 0
  
 ? 
(
  <>
  {console.log(filtered.length)}
  <div className="header" style={{width:"400px"}}><h1>Events</h1></div>
  
  <input style={{border:'none', boxShadow:'none', fontSize:'50px', textAlign:'center', color:'green'}} value={errMsg} readOnly={true} />
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {events && events.map(event => (
        <div className="event-container" key={event._id}>
          <a><img src={event.Image} className="event-image" alt="logo" /> </a>
          <h1>{event.Event_Name}</h1>
          <a>{event.Description}</a><br />
          {userInfo ? (
            <a>
              <Nav.Link as={Link} to={`/ticket/${event.Event_ID}`}><button className="book-a-ticket">get your ticket</button></Nav.Link>
            </a>
          ) : (
            <a>
              <Nav.Link as={Link} to={"/signin"}><button className="book-a-ticket">Sign In to get your ticket</button></Nav.Link>
            </a>
          )}
        </div>
      ))}
</>

) :filtered===0 ? (
  <>
  <div className="header"><h1>Search Result</h1></div>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {filtered && filtered?.map(event => (
        <div className="event-container" key={event._id}>
          <a><img src={event.Image} className="event-image" alt="logo" /> </a>
          <h1>{event.Event_Name}</h1>
          <a>{event.Description}</a><br />
          {userInfo ? (
            <a>
              <Nav.Link as={Link} to={`/ticket/${event.Event_ID}`}><button className="book-a-ticket">get your ticket</button></Nav.Link>
            </a>
          ) : (
            <a>
              <Nav.Link as={Link} to={"/signin"}><button className="book-a-ticket">Sign In to get your ticket</button></Nav.Link>
            </a>
          )}
        </div>
      ))}
</>
) : (
<>
<div className="header"><h1>Search Results</h1></div>
{/* <h3>Filtered by : Popularity</h3> */}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {data && data?.events?.map(event => (
        <div className="event-container" key={event._id}>
          <a><img src={event.Image} className="event-image" alt="logo" /> </a>
          <h1>{event.Event_Name}</h1>
          <a>{event.Description}</a><br />
          {userInfo ? (
            <a>
              <Nav.Link as={Link} to={`/ticket/${event.Event_ID}`}><button className="book-a-ticket">get your ticket</button></Nav.Link>
            </a>
          ) : (
            <a>
              <Nav.Link as={Link} to={"/signin"}><button className="book-a-ticket">Sign In to get your ticket</button></Nav.Link>
            </a>
          )}
        </div>
      ))}
</>
) 
}





      <div className="not-footer-event"><h1>Looking to Advertise Your Event?</h1></div>
      <button className="click-here" type="submit">Click here</button>
    </div>
  )
}


export default Events;