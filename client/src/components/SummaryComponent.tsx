import './styles/SummaryComponent.css';

interface SummaryProps {
    title: string;
    amount?: number;
}

const SummaryComponent: React.FC<SummaryProps> = ({title, amount}) => {
    return (
        <div className='summaryElementContainer'>
            <p className='summaryTitle'>{title}</p>
            <p className='summaryAmount'>Rs {amount}</p>
        </div>
    )
}

export default SummaryComponent;