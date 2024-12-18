interface ButtonProps {
    onClick: () => void;
    className?: string;
    children: React.ReactNode;

}

const Button = ({ children, onClick, className  }: ButtonProps) => {
    return (
        <button className={`${className} border border-1 px-4 py-2 rounded-full`} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;