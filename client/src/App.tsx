import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import Main from './Main';

function App() {
	return (
		<div>
			<Main />
			<ToastContainer />
		</div>
	);
}

export default App;
