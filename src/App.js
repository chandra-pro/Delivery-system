import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";
import OrderedHistory from "./components/Main/OrderedHistory";
import DeliveryPartner from "./components/Main/DeliveryPartner";
import Bugs from "./components/Main/Bugs";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/users/:id/verify/:token" element={<EmailVerify/>}/>
			{user && <Route path="/delivereditems" element={<OrderedHistory />} />}
            {user && <Route path="/undelivereditems" element={<DeliveryPartner/>} />}
			{user && <Route path="/bugs" element={<Bugs/>} />}

			
		</Routes>
	);
}

export default App;
