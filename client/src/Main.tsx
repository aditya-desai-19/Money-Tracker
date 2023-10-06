import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';

const Main: React.FC = () => {
    return (
        <Routes>
            <Route>
                <Route path='/' element={<Home />} />
                <Route path='*' element={<Home />} />
            </Route>
        </Routes>
    )
}

export default Main;