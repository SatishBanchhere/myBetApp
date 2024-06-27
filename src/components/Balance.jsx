export const Balance = ({ value }) => {
    // Extract last two digits of the balance value
    const roundedValue = parseFloat(value).toFixed(2);

    return (
        <div className="ml-3">
            <p className="text-lg font-bold text-gray-800">
                Your Balance : ₹ {roundedValue}
            </p>
        </div>
    );
};
