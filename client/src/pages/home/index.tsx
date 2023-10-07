import Navigation from "../../containers/Navigation";
import Footer from "../../containers/Footer";
import Summary from "../../containers/Summary";
import styles from './styles/styles.module.css';
import Transaction from "../../containers/Transaction";
import TransactionHistory from "../../containers/TransactionHistory";

const Home: React.FC = () => {

    return (
        <div className={styles.mainContainer}>
            <Navigation />
            <div className={styles.transactionDetailsContainer}>
                <Summary />
                <Transaction />
                <TransactionHistory />
            </div>
            <Footer />
        </div>
    )
}

export default Home;