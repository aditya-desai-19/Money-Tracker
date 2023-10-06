import { Modal } from "react-bootstrap";

interface ModalProps {
    show: boolean;
    onHide: () => void;
    title: string;
    body: JSX.Element | string | boolean;
    footer?: JSX.Element;
    dialogClassName?: string;
    centered?: boolean;
    style?: React.CSSProperties;
}

const defaultProps: Partial<ModalProps> = {
    style: { color: 'black' }
}

const ModalComponent: React.FC<ModalProps> = ({
    show,
    onHide,
    title,
    body,
    footer,
    dialogClassName,
    centered,
    style
}) => {
    return (
        <Modal show={show} onHide={onHide} dialogClassName={dialogClassName} centered={centered} style={style}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>{footer}</Modal.Footer>
        </Modal>
    )
}

ModalComponent.defaultProps = defaultProps;
export default ModalComponent;