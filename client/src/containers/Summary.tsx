import { useEffect, useState } from "react";
import SummaryComponent from "../components/SummaryComponent";
import "./styles/Summary.css";

const Summary: React.FC = () => {
    const [income, setIncome] = useState<number>(0);
    const [expense, setExpense] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        async function getIncome() {
            const response = await fetch("http://localhost:8080/income");
            try {
                if(!response.ok) {
                    throw new Error("Some error occurred");
                }
                const data = await response.json();
                setIncome(data[0]?.income);
            } catch (error) {
                console.log(error);
            }
        }

        async function getExpense() {
            const response = await fetch("http://localhost:8080/expense");
            try {
                if(!response.ok) {
                    throw new Error("Some error occurred");
                }
                const data = await response.json();
                console.log(data[0]?.expense);
                setExpense(data[0]?.expense);
            } catch (error) {
                console.log(error);
            }
        }

        async function getTotal() {
            const response = await fetch("http://localhost:8080/total");
            try {
                if(!response.ok) {
                    throw new Error("Some error occurred");
                }
                const data = await response.json();
                setTotal(data[0]?.total);
            } catch (error) {
                console.log(error);
            }
        }

        getIncome();
        getExpense();
        getTotal();
    },[total]);

    return (
        <div className="summaryContainer">
            <h4 className="summaryContainerTitle">Summary</h4>
            <div className="summaryElements">
                <SummaryComponent title="Income" amount={income} />
                <SummaryComponent title="Expense" amount={expense} />
                <SummaryComponent title="Total" amount={total} />
            </div>
        </div>
    )
}

export default Summary;