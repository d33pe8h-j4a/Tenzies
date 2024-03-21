import { nanoid } from "nanoid";
export default function Die({ value, isHeld, toggleHold }) {
    const held = isHeld ? "held" : "";
    function getDie() {
        let dotElements = [];
        if (value <= 3) {
            for (let i = 0; i < value; i++) {
                dotElements.push(<div className="dot" key={nanoid()}></div>);
            }
        } else if (value === 4) {
            for (let i = 0; i < 2; i++) {
                dotElements.push(
                    <div className="column" key={nanoid()}>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                );
            }
        } else if (value === 5) {
            for (let i = 0; i < 3; i++) {
                if (i === 1) {
                    dotElements.push(
                        <div className="column" key={nanoid()}>
                            <div className="dot"></div>
                        </div>
                    );
                } else {
                    dotElements.push(
                        <div className="column" key={nanoid()}>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                    );
                }
            }
        } else {
            for (let i = 0; i < 2; i++) {
                dotElements.push(
                    <div className="column" key={nanoid()}>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                );
            }
        }
        return dotElements;
    }
    // const die = getDie();
    return (
        <div className={`die ${held} face${value}`} onClick={toggleHold}>
            {/* <h2 className="die-value">{value}</h2> */}
            {getDie()}
        </div>
    );
}
