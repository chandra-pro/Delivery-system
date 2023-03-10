import React,{useState,useEffect} from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const Main = () => {
	
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
	const navigate = useNavigate();
	function Redirect(){
	  
	  navigate('/undelivereditems');
	}
	function DeliveredPage(){
	  navigate('/delivereditems');
	}
	
	return (
		
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Delivery System</h1>
				
				{/* <h4>Name:{daTa.firstname}</h4>
				<p>Email:{daTa.email}</p> */}
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<button className={styles.green_btn} onClick={DeliveredPage}>
					Items Delivered
				</button>
				
				<button className={styles.red_btn} onClick={Redirect}>
					Items Undelivered
				</button>
		</div>
	);
};

export default Main;
