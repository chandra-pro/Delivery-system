import React,{useEffect,useState} from 'react'
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import './opencard.css'
const BASE_URL='https://buybold.vmplay.ml/'
// const BASE_URL='http://localhost:4000/'


function OrderSubCard({DaTa}) {
    const [Prod_Name,setProd_Name]=useState("")
  const [Ind_Price,setInd_Price]=useState("");
  const [ImageUrl,setImageUrl]=useState(null);
  const [Tot_price,setTot_price ]=useState(null);
  const getImage=async ()=>{
    
  
    await fetch(BASE_URL + `products/get_individual/${DaTa.prod_id}`, { method: 'POST', body: JSON.stringify({}), })
    .then((response) => response.json())
    .then((result) => {
      console.log("Image found");
            console.log(result);
           
            // setPhoneNumber(result.qnt);
            setProd_Name(result.name);
            setInd_Price(result.price);
            setImageUrl(result.image);
            
    
          })
          .catch((error) => {
            console.log(error);
          });

          
    }
    useEffect(() => {
        getImage();
    
    }, [])

  return (
    <div className='Delivery-Subcard'> <Card className="Delivery-ind-Card"sx={{
     
        minWidth: 150, }}>
             
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {Prod_Name}
          {/* {prod_id} */}
        </Typography>
        <div className='Product-image'>
        <img width={70} height={50} src={ImageUrl} alt="Image"></img>
        
        
        
        {/* <Typography variant="body2"> */}
         <div className='Product-price'><h5>Price:</h5><h4> {Ind_Price} </h4></div>
         </div>
        {/* </Typography> */}
      </CardContent>
    
     
      
      
      
    </Card></div>
  )
}

export default OrderSubCard