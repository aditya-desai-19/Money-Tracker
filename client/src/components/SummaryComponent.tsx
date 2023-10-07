import styles from './styles/SummaryComponent.module.css';

interface SummaryProps {
    title: string;
    amount?: number;
}

const SummaryComponent: React.FC<SummaryProps> = ({ title, amount }) => (
    <div className={styles.summaryElementContainer}>
        <p className={styles.summaryTitle}>{title}</p>
        <p className={styles.summaryAmount}>Rs {amount}</p>
    </div>
)

export default SummaryComponent;