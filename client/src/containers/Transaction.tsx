import { Col, Row, Dropdown } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import ButtonComponent from "../components/ButtonComponent";
import styles from "./styles/Transaction.module.css";
import InputComponent from "../components/InputComponent";
import CustomDropDown from "../components/CustomDropDown";
import { transactionTypes, transactionCategories } from "../assests/data/data";
import { toast } from "react-toastify";

const Transaction: React.FC = () => {
    const [transactionType, setTransactionType] = useState<string | null>('Type');
    const [categoryLabel, setCategoryLabel] = useState<string | null>('Category');
    const [typeKey, setTypeKey] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);

    useEffect(() => {
        const key = transactionType ? transactionType : '';
        setTypeKey(key);
    }, [transactionType]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if ((transactionType === 'Type' || categoryLabel === 'Category')) {
            toast.error('Please enter the values in all the fields!', {
                position: "top-right",
                autoClose: 3000
            });
        } else {
            try {
                const data = { date: date, type: transactionType, category: categoryLabel, amount: amount };
                const request = await fetch("http://localhost:8080/addtransaction", {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!request.ok) {
                    throw new Error(`HTTP error: ${request.status}`);
                }

                const response = await request.text();
                toast.success(response, {
                    position: "top-right",
                    autoClose: 3000
                });
                setTransactionType('Type');
                setCategoryLabel('Category');
                setAmount(0);
                setDate('');
            } catch (error) {
                toast.error('Some error occured', {
                    position: "top-right",
                    autoClose: 3000
                });
            }
        }
    };

    const handleDate = useCallback((e: any) => {
        setDate(e.target.value);
    }, []);

    const handleAmount = useCallback((e: any) => {
        setAmount(e.target.value);
    }, []);

    const selectTransactionType = useCallback((value: string | null) => {
        setTransactionType(value);
    }, []);

    const selectCategoryType = useCallback((value: string | null) => {
        setCategoryLabel(value);
    }, []);

    return (
        <div className={styles.transactionContainer}>
            <h4 className={styles.transactionTitle}>Transaction</h4>
            <form onSubmit={handleSubmit}>
                <Row className={styles.transactionRow}>
                    <Col>
                        <InputComponent
                            type="date"
                            className={styles.dateAndAmountInput}
                            onChange={handleDate}
                            value={date}
                            required
                        />
                    </Col>
                    <Col>
                        <CustomDropDown
                            label={transactionType ? transactionType : 'Type'}
                            onSelect={selectTransactionType}
                            variant="light"
                            dropdownToggleStyle={{ width: "100%" }}
                            logic={transactionTypes?.map((item) =>
                                <Dropdown.Item eventKey={item.value}>{item.type}</Dropdown.Item>
                            )}
                        />
                    </Col>
                </Row>
                <Row className={styles.transactionRow}>
                    <Col>
                        <InputComponent
                            type="number"
                            className={styles.dateAndAmountInput}
                            placeholder="Amount"
                            onChange={handleAmount}
                            value={amount.toString() === "0" ? "" : amount.toString()}
                            required
                        />
                    </Col>
                    <Col>
                        <CustomDropDown
                            label={categoryLabel ? categoryLabel : 'Category'}
                            onSelect={selectCategoryType}
                            variant="light"
                            dropdownToggleStyle={{ width: "100%" }}
                            dropdownMenuStyle={{ height: "5rem", overflowY: "scroll" }}
                            logic={transactionCategories[typeKey]?.map((item) =>
                                <Dropdown.Item eventKey={item}>{item}</Dropdown.Item>
                            )}
                        />
                    </Col>
                </Row>
                <ButtonComponent
                    type="submit"
                    label="Add Transaction"
                    variant="danger"
                    style={{ width: "50%", marginTop: "1rem", marginLeft: "5rem" }}
                />
            </form >
        </div>
    )
}

export default Transaction;