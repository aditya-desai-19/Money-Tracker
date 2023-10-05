import "./styles/TransactionHistory.css"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalComponent from "../components/ModalComponent";
import ButtonComponent from "../components/ButtonComponent";
import InputComponent from "../components/InputComponent";
import CustomDropDown from "../components/CustomDropDown";
import { transactionCategories, transactionTypes } from "../assests/data/data";
import { Dropdown } from "react-bootstrap";

interface transactionDetailsProps {
    id: number;
    date: string;
    type: string;
    category: string;
    amount: number;
}

const TransactionHistory: React.FC = () => {
    const [transactions, setTransactions] = useState<object[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [id, setId] = useState<number>(0);
    const [transactionType, setTransactionType] = useState<string | null>('Type');
    const [categoryLabel, setCategoryLabel] = useState<string | null>('Category');
    const [typeKey, setTypeKey] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [transactionDetails, setTransactionDetails] = useState<transactionDetailsProps>({
        id: 0,
        date: '',
        type: '',
        category: '',
        amount: 0
    });

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

    useEffect(() => {
        fetchTransactionDetails();
    }, [id]);

    useEffect(() => {
        const key = transactionType ? transactionType : '';
        setTypeKey(key);
    }, [transactionType]);

    useEffect(() => {
        setDate(transactionDetails?.date);
        setTransactionType(transactionDetails?.type);
        setCategoryLabel(transactionDetails?.category);
        setAmount(transactionDetails?.amount);
    }, [transactionDetails])

    const openDeleteModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        setId(Number(event.currentTarget.id));
        setShowDeleteModal(true);
    }

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    }

    const deleteTransaction = () => {
        const response = fetch(`http://localhost:8080/transaction/${id}`, { method: 'DELETE' });
        response
            .then((response) => response.text())
            .then((message) => {
                console.log({ message })
                toast.success(message, {
                    position: "top-right",
                    autoClose: 3000
                });
                setShowDeleteModal(false);
            })
            .catch((error) => console.log(error))
    }

    const handleDate = (e: any) => {
        setDate(e.target.value);
    };

    const handleAmount = (e: any) => {
        setAmount(e.target.value);
    };

    const selectTransactionType = (value: string | null) => {
        setTransactionType(value);
    }

    const selectCategoryType = (value: string | null) => {
        setCategoryLabel(value);
    }

    const fetchTransactionDetails = async () => {
        const response = await fetch(`http://localhost:8080/transactiondetails/${id}`);
        try {
            if (!response.ok) {
                throw new Error('Failed to fetch transaction details');
            }
            const data = await response.json();
            setTransactionDetails(data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    const openEditModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        setId(Number(event.currentTarget.id));
        setShowEditModal(true);
    }

    const closeEditModal = () => {
        setShowEditModal(false);
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
                                <button className="operationButton" id={transaction.id} onClick={openEditModal}>
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
                        <ButtonComponent label="Delete" onClick={deleteTransaction} variant="danger" />
                        <ButtonComponent label="Cancel" onClick={closeDeleteModal} />
                    </>
                }
                centered
            />
            <ModalComponent
                show={showEditModal}
                onHide={closeEditModal}
                title="Edit Transaction"
                body={
                    <>
                        <InputComponent
                            type="date"
                            className="editInput"
                            onChange={handleDate}
                            value={date}
                            required
                        />
                        <CustomDropDown
                            label={transactionType}
                            onSelect={selectTransactionType}
                            variant="light"
                            dropdownToggleStyle={{ width: "100%" }}
                            logic={transactionTypes?.map((item) =>
                                <Dropdown.Item eventKey={item.value}>{item.type}</Dropdown.Item>
                            )}
                            className="editInput"
                        />
                        <InputComponent
                            type="number"
                            className="editInput"
                            placeholder="Amount"
                            onChange={handleAmount}
                            value={amount?.toString()}
                            required
                        />
                        <CustomDropDown
                            label={categoryLabel}
                            onSelect={selectCategoryType}
                            variant="light"
                            dropdownToggleStyle={{ width: "100%" }}
                            logic={transactionCategories[typeKey]?.map((item) =>
                                <Dropdown.Item eventKey={item}>{item}</Dropdown.Item>
                            )}
                            className="editInput"
                        />
                    </>
                }
                footer={
                    <>
                        <ButtonComponent label="Update" onClick={deleteTransaction} variant="warning" />
                        <ButtonComponent label="Cancel" onClick={closeDeleteModal} />
                    </>
                }
                centered
            />
        </div>
    )
}

export default TransactionHistory;