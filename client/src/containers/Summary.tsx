import { useCallback, useEffect, useState } from "react";
import SummaryComponent from "../components/SummaryComponent";
import styles from "./styles/Summary.module.css";
import ButtonComponent from "../components/ButtonComponent";
import ModalComponent from "../components/ModalComponent";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import renderCustomizedLabel from "./RenderCustomizedLabel";

interface AmountProps {
    income: number,
    expense: number,
    total: number
}

const Summary: React.FC = () => {
    const [amount, setAmount] = useState<AmountProps>({
        income: 0,
        expense: 0,
        total: 0
    });
    const [showAnalyticModal, setShowAnalyticModal] = useState<boolean>(false);

    useEffect(() => {
        Promise.all([
            fetch("http://localhost:8080/income"),
            fetch("http://localhost:8080/expense"),
            fetch("http://localhost:8080/total")
        ]).then(([resIncome, resExpense, resTotal]) => {
            return Promise.all([resIncome.json(), resExpense.json(), resTotal.json()]);
        }).then(([dataIncome, dataExpense, dataTotal]) => {
            setAmount({ income: dataIncome[0].income, expense: dataExpense[0].expense, total: dataTotal[0].total });
        }).catch((error) => {
            console.log(error);
        })
    }, [amount]);

    const openAnalyticModal = useCallback(() => {
        setShowAnalyticModal(true);
    },[]);

    const closeAnalyticModal = useCallback(() => {
        setShowAnalyticModal(false);
    },[]);

    const data = [
        { name: "Income", value: (amount.total - amount.expense) },
        { name: "Expense", value: (amount.total - amount.income) },
    ];

    const colors = ["#362FD9", "#D80032"];

    return (
        <div className={styles.summaryContainer}>
            <h4 className={styles.summaryContainerTitle}>Summary</h4>
            <div className={styles.summaryElements}>
                <SummaryComponent title="Income" amount={amount.income} />
                <SummaryComponent title="Expense" amount={amount.expense} />
                <SummaryComponent title="Total" amount={amount.total} />
            </div>
            <ButtonComponent
                label="View anaylsis"
                variant="outline-primary"
                className={styles.analyticButton}
                onClick={openAnalyticModal}
            />
            <ModalComponent
                show={showAnalyticModal}
                onHide={closeAnalyticModal}
                title="Analysis"
                body={
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Legend />
                            <Pie
                                data={data}
                                cx={200}
                                cy={200}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                labelLine={false}
                                label={renderCustomizedLabel}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                }
                bodyClassName={styles.modalBody}
            />
        </div>
    )
}

export default Summary;