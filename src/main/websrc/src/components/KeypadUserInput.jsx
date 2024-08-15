import '../style/keypad.css';

export default function KeypadUserInput({ userInput }) {
    return (
        <div className="input-group-style">
            {Array.isArray(userInput) ? (
                userInput.map((input, index) => (
                    <div key={index} className="input-char-style active"></div>
                ))
            ) : (
                <div>Invalid input data</div>
            )}
            {[...Array(6 - (Array.isArray(userInput) ? userInput.length : 0))].map((_, index) => (
                <div key={index} className="input-char-style"></div>
            ))}
        </div>
    );
}
