import { Dropdown } from "react-bootstrap";

interface customDropDownProps {
    label: any;
    logic: JSX.Element[];
    variant?: "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "light" | "dark";
    onSelect?: (e: string | null)  => void;
    dropdownToggleStyle?: React.CSSProperties;
    dropdownMenuStyle?: React.CSSProperties;
    className?: string;
    id?: string;
}

const CustomDropDown: React.FC<customDropDownProps> = ({
    label,
    logic,
    variant,
    onSelect,
    dropdownToggleStyle,
    dropdownMenuStyle,
    className,
    id
}) => {
    return (
        <Dropdown onSelect={onSelect} className={className} id={id}>
            <Dropdown.Toggle variant={variant} style={dropdownToggleStyle}>
                {label}
            </Dropdown.Toggle>
            <Dropdown.Menu style={dropdownMenuStyle}>
                {logic}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default CustomDropDown;