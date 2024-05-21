import XOutline from "../../../assets/icon/x-outline.svg"

interface TagProps {
    label: string;
    onClick: (e) => void;
}

const Tag: React.FC<TagProps> = ({ label, onClick }) => {
    return (
        <div className="flex py-2 pl-4 pr-2 items-center rounded-lg border-solid border-1 border-gray-300 bg-gray-50 gap-2">
            <span className="text-sm font-normal leading-5">{label}</span>
            <button onClick={onClick}>
                <img src={XOutline} width={12} height={12} className="flex-shrink-0"></img>
            </button>
        </div>
    )
}

export default Tag