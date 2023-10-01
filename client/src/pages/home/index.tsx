import Navigation from "../../containers/Navigation";
import Footer from "../../containers/Footer";
import Summary from "../../containers/Summary";
import './styles/styles.css';
import Transaction from "../../containers/Transaction";
import TransactionHistory from "../../containers/TransactionHistory";

const Home: React.FC = () => {

    return (
        <div className="mainContainer">
            <Navigation />
            <div className="transactionDetailsContainer">
                <Summary />
                <Transaction />
                <TransactionHistory />
            </div>
            <Footer />
        </div>
    )
}

export default Home;