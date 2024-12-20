import { SvgProp } from "./typs"

const CircleIcon = (props: SvgProp) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        {...props}
    >
        <circle cx="50" cy="50" r="50" />
    </svg>
)
export default CircleIcon