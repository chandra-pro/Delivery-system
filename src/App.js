import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";
import OrderedHistory from "./components/Main/OrderedHistory";
import DeliveryPartner from "./components/Main/DeliveryPartner";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/users/:id/verify/:token" element={<EmailVerify/>}/>
			<Route path="/delivereditems" element={<OrderedHistory />} />
            <Route path="/undelivereditems" element={<DeliveryPartner/>} />
		</Routes>
	);
}

export default App;
