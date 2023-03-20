import React,{useEffect,useState} from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CommentIcon from '@mui/icons-material/Comment';
import './opencard.css'
const BASE_URL='https://buybold.vmplay.ml/'

const Bugs=()=> {
    const [bugList,setbugList]=useState([]);
    const fetchbug=async()=>{
        await fetch(BASE_URL+ `bug/fetch`,{method:'GET'})
        .then((response) => response.json())
            .then((data) => {
             console.log(data)
                    if(data){
                   setbugList(data)
    
                    }
                    else{
                     //  setOrderList("Order Undelivered")
                    setbugList([]);
                      
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });


    }
    useEffect(()=>{
        fetchbug();
    
    },[])

  return (
    <div>
    {bugList.length >= 1 ? (
            bugList.map((event, i) => {
              return(<><div className='bug-card'><div className='bug-subcard'><AccountCircleIcon /><p>{event.phone}</p></div>
              <div className='bug-subcard2'><CommentIcon/><h4>{event.bug}</h4></div></div>
               
              </>);
            })
          ) : (
            <h2>No Bugs</h2>
          )}

    </div>
  )
}

export default Bugs