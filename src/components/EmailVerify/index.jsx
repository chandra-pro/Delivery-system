import { useEffect,useState,Fragment } from 'react';
import styles from './styles.module.css';
import {Link,useParams} from 'react-router-dom';
import axios from 'axios';
// const BASE_URL='http://localhost:4000/'
const BASE_URL='https://buybold.vmplay.ml/'
const EmailVerify=()=>{
    const [validUrl,setvalidUrl]=useState(true);
    const param = useParams();
    useEffect(()=>{
        const verifyEmailUrl=async()=>{
            try{
                const url = BASE_URL+`api/users/${param.id}/verify/${param.token}`;
                const {data}=await axios.get(url);
                console.log(data);
                setvalidUrl(true)
            }catch(error){
                console.log(error)
                setvalidUrl(false)
            }
        };
        verifyEmailUrl()
    },[])
    return(
     <Fragment>
        {validUrl?(
        <div className={styles.container}>
            {/* <img src={success} alt="sucess-img" className={styles.success_img}/> */}
            <h1>Email Verified Successfully</h1>
            <Link to="/login">
                <button className={styles.green_btn}>Login</button>
            </Link>
        </div>
        ):(
          <h2>404 not found </h2>  
        )}
     </Fragment>
    )
}
export default EmailVerify;