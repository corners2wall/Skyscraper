import { Line, Size } from "../Types/common";

export default function getIntersection(line1: Line, line2: Line): Size {
    if (line1.end < line2.start || line2.end < line1.start) {
        return ({ size: 0, start: 0 })
    }

    if (line2.start <= line1.start && line2.end <= line1.end) {
        const size = line2.end - line1.start;
        const start = line1.start + (size / 2);

        return ({ size, start })
    }

    if (line1.start <= line2.start && line1.end <= line2.end) {
        const size = line1.end - line2.start;
        const start = line2.start + (size / 2);

        return ({ size, start })
    }

    return ({ size: 0, start: 0 })
}
