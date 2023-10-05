import { useEffect, useState } from "react";
import SummaryComponent from "../components/SummaryComponent";
import "./styles/Summary.css";

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

    useEffect(() => {
        Promise.all([
            fetch("http://localhost:8080/income"),
            fetch("http://localhost:8080/expense"),
            fetch("http://localhost:8080/total")
        ]).then(([resIncome, resExpense, resTotal]) => {
            return Promise.all([resIncome.json(), resExpense.json(), resTotal.json()]);
        }).then(([dataIncome, dataExpense, dataTotal]) => {
            setAmount({income: dataIncome[0].income, expense: dataExpense[0].expense, total: dataTotal[0].total});
        }).catch((error) => {
            console.log(error);
        })
    }, [amount]);

    return (
        <div className="summaryContainer">
            <h4 className="summaryContainerTitle">Summary</h4>
            <div className="summaryElements">
                <SummaryComponent title="Income" amount={amount.income} />
                <SummaryComponent title="Expense" amount={amount.expense} />
                <SummaryComponent title="Total" amount={amount.total} />
            </div>
        </div>
    )
}

export default Summary;