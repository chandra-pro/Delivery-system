import React,{useEffect,useState} from 'react'

import {createTheme } from '@mui/system';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './opencard.css'
import OrderSubCard from './OrderSubCard';

const BASE_URL='https://buybold.vmplay.ml/'
// const BASE_URL='http://localhost:4000/'


    
  
const theme = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      dark: '#009688',
    },
  },
});

const OrderCard=({daTa})=> {
    const [OrderList, setOrderList] =useState(null)
    const [Orderitem,setOrderitem]=useState([]);
    const [fetchbutton,setfetchbutton]=useState(false)
    const [PhoneNumber,setPhoneNumber]=useState("")
    const [Name,setName]=useState("")
    const[Quantity,setQuantity]=useState("")
    const [Clicked, setClicked] = useState("outlined");
    
    
    const MovetoOrder=async()=>{
        console.log(daTa.order_id)
            await fetch(BASE_URL + `orderManage/getstatus/${daTa.order_id}`, { method: 'POST', body: JSON.stringify({}), })
            .then((response) => response.json())
            .then((data) => {
              console.log("Quantity found");
                    console.log(data);
                    if(data.stage===3){
                    setOrderList("Order delivered");
                    setClicked("contained")
                    setfetchbutton(false)
                
    
                    }
                    else{
                     setfetchbutton(true);
                      
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });

     }
     const update = async () => {
   
    
      const user_id=daTa.user_id;
      const order_id=daTa.order_id;
      
        await fetch(BASE_URL + `orderManage/updateStage/${user_id}/${order_id}/3/0`, { method: 'POST',
        headers: {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        },
        
        body: JSON.stringify({})
      })
          .then((response) => response.json())
          .then((data) => {
            console.log("found data");
            console.log(data);
              setOrderList("Order delivered");
              setClicked("contained")
              // setDeliver("Delivered")
              setfetchbutton(false)
          
          })
          .catch((error) => {
            console.log(error);
          });
       
      };
      const GetOrders=async()=>{
        const order_id=daTa.order_id;
        await fetch(BASE_URL + `orderManage/getorders/${order_id}`, { method: 'POST', body: JSON.stringify({}), })
        .then((response) => response.json())
        .then((data) => {
          console.log("Items found");
                console.log(data);
                if(data){
                setOrderitem(data);
               
  
                }
                else{
                  setOrderitem([{message:"dont have any orders"}])
                  
                }
              })
              .catch((error) => {
                console.log(error);
              });
  
    }
     const getquantity=async ()=>{
      const orderid=daTa.order_id;
      await fetch(BASE_URL + `orderManage/getqnt/${orderid}`, { method: 'POST', body: JSON.stringify({}), })
     .then((response) => response.json())
     .then((result) => {
             setQuantity(result.qnt);
           })
           .catch((error) => {
             console.log(error);
           });
     }
  
        const getPhone = async()=>{
         const user_id=daTa.user_id;
         console.log(daTa.user_id);
     await fetch(BASE_URL + `sessionManage/getphone/${user_id}`, { method: 'POST', body: JSON.stringify({}), })
     .then((response) => response.json())
     .then((result) => {
       console.log("User found");
             console.log(result);
             setName(result.name)
             setPhoneNumber(result.phone);
             console.log(result.phone);
     
           })
           .catch((error) => {
             console.log(error);
           });
         }
         useEffect(() => {
          
          GetOrders();
          getquantity();
          getPhone();
      
    }, []);

  return (
    
    
    <div className='Delivery-card' theme={theme}> <Card className="Delivery-ind-Card"sx={{
     
      minWidth: 200, }}>
            <div>
        {Orderitem.length >= 1 ? (
                Orderitem.map((event, i) => {
                  return(<><div className='Product-quantity'>Quantity:<p>{Quantity}</p></div>
                   <OrderSubCard DaTa={event}key={i}  />
                  </>);
                })
              ) : (
                <h2>No Orders</h2>
              )}
      </div>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
       <div className='Address-Container'>
        <h3>Address:</h3>
        <p>{daTa.loc1},{daTa.loc2}</p>
        <p>Pin:{daTa.pin},City:{daTa.city}</p>
        <p>long:{daTa.location.coordinates[0]},lat:{daTa.location.coordinates[1]}</p>
       </div>
     
        {daTa.order_id} 
      </Typography>
    </CardContent>
    <h3>Name:{Name}</h3>
    <h4>Phone:{PhoneNumber}</h4>
   
    <Button variant={Clicked} size="small" onClick={MovetoOrder}>Check deliver status</Button>
    <CardActions className='Card-action'>
    
       
      
      
      <div className='deliver-button'>{fetchbutton && <Button variant={Clicked} size="small"  onClick={update}>Deliver</Button>}</div>
    </CardActions>
    <h3>{OrderList}</h3>
    
    
  </Card></div>
  

  )
    }
    
export default OrderCard;











