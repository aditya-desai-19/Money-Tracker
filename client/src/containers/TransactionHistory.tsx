import "./styles/TransactionHistory.css"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalComponent from "../components/ModalComponent";
import ButtonComponent from "../components/ButtonComponent";

const TransactionHistory: React.FC = () => {
    const [transactions, setTransactions] = useState<object[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [id, setId] = useState<number>(0);

    useEffect(() => {
        const response = fetch("http://localhost:8080/transactions");
        response
            .then((response) => response.json())
            .then((response) => setTransactions(response))
            .catch((error) => {
                toast.error('Some error occured', {
                    position: "top-right",
                    autoClose: 3000
                });
                console.log(error)
            })
    }, [transactions]);

    const openDeleteModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        setId(Number(event.currentTarget.id));
        setShowDeleteModal(true);
    }

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    }

    const deleteTransaction = () => {
        const response = fetch(`http://localhost:8080/transaction/${id}`, { method: 'DELETE'});
        response
            .then((response) => response.text())
            .then((message) => {
                console.log({message})
                toast.success(message, {
                    position: "top-right",
                    autoClose: 3000
                });
                setShowDeleteModal(false);
            })
            .catch((error) => console.log(error))
    }

    return (
        <div className="transactionHistoryContainer">
            <h4 className="transactionHistoryTitle">Transaction History</h4>
            <table>
                <thead>
                    <tr>
                        <th className="heading"><p>Date</p></th>
                        <th className="heading"><p>Type</p></th>
                        <th className="heading"><p>Amount</p></th>
                        <th className="heading"><p>Delete/Edit</p></th>
                    </tr>
                </thead>
                <tbody>
                    {transactions?.map((transaction: any) =>
                        <tr key={transaction?.id}>
                            <td className="transactionHistory">{transaction?.date}</td>
                            <td className="transactionHistory">{transaction?.type}</td>
                            <td className="transactionHistory">{transaction?.amount}</td>
                            <td className="transactionHistory">
                                <button className="operationButton" id={transaction.id} onClick={openDeleteModal}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                                <button className="operationButton" data-id={transaction.id}>
                                    <FontAwesomeIcon icon={faPencil} />
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <ModalComponent 
            show={showDeleteModal} 
            onHide={closeDeleteModal}
            title="Delete Transaction"
            body="Are you sure you want to delete this transaction?"
            footer={
                <>
                    <ButtonComponent label="Delete" onClick={deleteTransaction} variant="danger"/>
                    <ButtonComponent label="Cancel" onClick={closeDeleteModal}/>
                </>
            }
            centered
            />
        </div>
    )
}

export default TransactionHistory;