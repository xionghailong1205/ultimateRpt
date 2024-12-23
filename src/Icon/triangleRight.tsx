import { SvgProp } from "./typs"

const TriangleRight = (props: SvgProp) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 15 15"
        {...props}
    >
        <path fill="currentColor" d="M6 11V4l4.5 3.5L6 11Z" />
    </svg>
)
export default TriangleRight