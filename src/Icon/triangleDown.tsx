import { SvgProp } from "./typs"

const TriangleDown = (props: SvgProp) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 15 15"
        {...props}
    >
        <path fill="currentColor" d="M4 6h7l-3.5 4.5L4 6Z" />
    </svg>
)
export default TriangleDown