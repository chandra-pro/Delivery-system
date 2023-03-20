import React,{useEffect,useState} from 'react'
import styled from 'styled-components';
import { Box, ThemeProvider, createTheme } from '@mui/system';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeliveryPartner from './DeliveryPartner';
import { useNavigate,Routes,Route } from 'react-router-dom';
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

const DeliveredCard=({daTa})=> {
    const [OrderList, setOrderList] =useState(null)
    const [Orderitem,setOrderitem]=useState([]);
    const [fetchbutton,setfetchbutton]=useState(false)
    const [PhoneNumber,setPhoneNumber]=useState("")
    
   
     const[Quantity,setQuantity]=useState("")
    // const [prod_id,setprod_id]=useState("")
   
    const [Total_Price,setTotal_Price]=useState("")
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
                    // setDeliver("Delivered")
    
                    }
                    else{
                     //  setOrderList("Order Undelivered")
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
        //  headers: {
        //   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        body: JSON.stringify({})
      })
          .then((response) => response.json())
          .then((data) => {
            console.log("found data");
            console.log(data);
            // if(data.stage===3)
            
              setOrderList("Order delivered");
              setClicked("contained")
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
       console.log("User found");
             console.log(result);
            console.log("mila quantity?")
             setQuantity(result.qnt);
     
           })
           .catch((error) => {
             console.log(error);
           });
     }
    
     
        
    

         
     
        
    
    
        
       
         useEffect(() => {
          
          GetOrders();
          getquantity();
         
      
    }, []);


        // const getPhone=async ()=>{

       
           
     
  return (
    
    
    <div className='Delivery-card' theme={theme}> <Card className="Delivery-ind-Card"sx={{
     
      minWidth: 300, }}>
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
        {/* {listitem.map((ListItem, index) => {
          return (
            <div key={index}>
              <h3>{ListItem.loc1}</h3>
            </div>
          );
        })} */}
      </div>
   
    <CardActions className='Card-action'>
    
       
      
      
      <div className='deliver-button'>{fetchbutton && <Button variant={Clicked} size="small"  onClick={update}>Deliver</Button>}</div>
      {/* if({OrderList}==="Order Undelivered"){
        
      } */}
    </CardActions>
    <h3>{OrderList}</h3>
    
    
  </Card></div>
  

  )
    }
    
export default DeliveredCard;











