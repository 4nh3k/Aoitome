import React from 'react'
import XOutline from "../../../assets/icon/x-outline.svg"
import LineSeparator from "../../../assets/icon/line.svg"
import ChevronDown from "../../../assets/icon/chevron-down.svg"
import Tag from '../Tag/Tag'
const GenresInput = () => {
	return (
		<div className="flex flex-col items-start gap-2 flex-1 self-strech flex-grow">
			<span className="text-sm font-medium leading-5">Genres</span>
			<div className="flex py-5 px-4 items-center gap-4 self-strech rounded-xl border-1 border-solid border-primary bg-white w-full">
				<div className="flex flex-grow items-center gap-4 flex-1">
					<div className="flex flex-grow items-center gap-4 flex-1">
						<Tag label={'Raiden Mei'} />
						<Tag label={'Kiana Kaslana'} />
						<Tag label={'Bronya Zaychik'} />
					</div>
					<div className="flex items-center gap-3">
						<img src={XOutline} width={12} height={12} />
						<img src={LineSeparator} className="h-fit" />
						<img src={ChevronDown} width={12} height={12} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default GenresInput