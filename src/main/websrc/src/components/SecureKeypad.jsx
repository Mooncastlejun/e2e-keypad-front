import '../style/keypad.css'

export default function SecureKeypad({ keypad, onKeyPressed }) {
    const rows = 3;
    const cols = 4;
    const cellWidth = 100 / cols; // 테이블 칸의 너비 비율

    return (
        <table className="table-style">
            <tbody>
                {[...Array(rows)].map((_, rowIndex) => (
                    <tr key={rowIndex}>
                        {[...Array(cols)].map((_, colIndex) => (
                            <td key={colIndex} className="td-style" style={{ width: `${cellWidth}%` }}>
                                <button
                                    className="button-style"
                                    onClick={() => onKeyPressed(rowIndex, colIndex)}
                                    style={{
                                        backgroundImage: `url(data:image/png;base64,${keypad})`,
                                        backgroundPosition: `${-colIndex * 100}% ${-rowIndex * 100}%`,
                                        backgroundSize: `${cols * 100}% ${rows * 100}%`
                                    }}
                                />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
