import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import Crossfire from "react-canvas-confetti/dist/presets/crossfire";

function Confetti() {
    return (
        <>
            <Fireworks autorun={{ speed: 1 }} />
            <Crossfire autorun={{ speed: 1 }} />
        </>
    );
}

export default Confetti;
