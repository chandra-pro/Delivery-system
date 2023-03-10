import React,{useEffect,useState} from 'react'

import DeliveredCard from './DeliveredCard';
const BASE_URL='https://buybold.vmplay.ml/'
// 

function OrderedHistory() {
    const [listitem,setlistitem]=useState([]);
   
   
    
    
    const AllOrders= async()=>{
        await fetch(BASE_URL + `orderManage/getstatus`, { method: 'POST', body: JSON.stringify({}), })
        .then((response) => response.json())
        .then((data) => {
          console.log("Items found");
                console.log(data);
                if(data){
                setlistitem(data);
               

                }
                else{
                  setlistitem([{message:"dont have any orders"}])
                  
                }
              })
              .catch((error) => {
                console.log(error);
              });

    }
    // const getPhone=async ()=>{
    //   const user_id=listitem.user_id;
    //   await fetch(BASE_URL + `sessionManage/getphone/${user_id}`, { method: 'POST', body: JSON.stringify({}), })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("User found");
    //           console.log(data);
    //           if(data!=null){
    //           setCartItems(data.phone);

    //           }
    //           else{
    //             setCartItems("User Unavailable")
    //           }
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         });

    // }
   
    useEffect(()=>{
        AllOrders();
        
    },[])
  return (
    <div>
      <h2>All Orders</h2>
        <div>
        {listitem.length >= 1 ? (
                listitem.map((event, i) => {
                  return <DeliveredCard daTa={event} key={i} />;
                })
              ) : (
                <h2>No Orders</h2>
              )}
        {/* {listitem.map((ListItem, index) => {
          return (
            <div key={index}>
              <h3>{ListItem.loc1}</h3>
            </div>
          );
        })} */}
      </div>
    </div>
  )
}

export default OrderedHistory