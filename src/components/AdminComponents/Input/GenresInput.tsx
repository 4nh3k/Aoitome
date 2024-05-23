import React, { useEffect, useState } from 'react'
import XOutline from "../../../assets/icon/x-outline.svg"
import LineSeparator from "../../../assets/icon/line.svg"
import ChevronDown from "../../../assets/icon/chevron-down.svg"
import Tag from '../Tag/Tag'
import Genre from '../../../types/Models/BookCatalog/Genre.type'
import { useQuery } from '@tanstack/react-query'
import { genresApi } from '../../../apis/genres.api'

interface GenreInputProps {
	selectedGenres: Genre[],
	onChange: (genres: Genre[]) => void;
}

const GenresInput: React.FC<GenreInputProps> = ({selectedGenres, onChange}) => {

	const [showDropdown, setShowDropdown] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	// const [selectedGenres, setSelectedGenres] = useState<Genre[]>();

	const [genres, setGenres] = useState<Genre[]>();

	const { data: genreData, isLoading: isLoadingGenre } = useQuery(
		{
			queryKey: ['admin', 'genres'],
			queryFn: () => {
				return genresApi.getGenresByPage(0, 100);
			}
		}
	);

	useEffect(() => {
		if (!isLoadingGenre && genreData) {
			const data = genreData.data.data;
			setGenres(data);
		}
	})

	const handleToggleDropdown = (e) => {
		e.stopPropagation(); // Stop the propagation of the click event
		setShowDropdown(!showDropdown);
	};

	const handleSelectGenre = (genre: Genre) => {
		// Check if the genre already exists in the selectedGenres array
		if (!selectedGenres) {
			// If it's null or undefined, initialize it as an empty array
			onChange([genre]);
		} else {
			// Check if the genre already exists in the selectedGenres array
			if (!selectedGenres.includes(genre)) {
				// If the genre doesn't exist, add it to the selectedGenres array
				onChange([...selectedGenres, genre]);
			}
		}
	};

	const handleRemoveGenre = (genre: Genre) => {
		onChange(selectedGenres?.filter((selectedGenre) => selectedGenre.name !== genre.name));
	};

	const handleSearchInputChange = (event) => {
		setSearchQuery(event.target.value);
	};

	const handleClearGenre = (event) => {
		onChange([]);
	}

	const filteredGenres = genres?.filter((genre) =>
		genre.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="flex flex-col items-start gap-2 flex-1 self-strech flex-grow">
			<span className="text-sm font-medium leading-5">Genres</span>
			<div className="flex py-5 px-4 items-center gap-4 self-strech rounded-xl border-1 border-solid border-primary bg-white w-full">
				<div className="flex flex-grow items-center gap-4 flex-1">
					<div className="flex flex-wrap items-center gap-4 flex-1 w-96">
						{selectedGenres && selectedGenres.map((genre) => (
							<Tag key={genre.id} label={genre.name} onClick={() => handleRemoveGenre(genre)} />
						))}
					</div>
					<div className="relative flex items-center gap-3">
						<button onClickCapture={handleClearGenre}>
							<img src={XOutline} width={12} height={12} />
						</button>
						<img src={LineSeparator} className="h-fit" />
						<button onMouseDown={(event) => event.preventDefault()} onClick={handleToggleDropdown}>
							<img src={ChevronDown} width={12} height={12} />
						</button>
						{showDropdown && (
							<div className="absolute left-10 top-5 mt-0 pt-1 pb-3 w-72 h-30 bg-white border border-gray-300 rounded-md shadow-md">
								<input
									type="text"
									className="w-full px-3 py-1 border-b border-gray-300 focus:outline-none"
									placeholder="Search genres"
									value={searchQuery}
									onChange={handleSearchInputChange}
								/>
								<ul className="overflow-auto max-h-20">
									{filteredGenres.map((genre) => (
										<li key={genre.id} className="text-left px-3 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSelectGenre(genre)}>
											{genre.name}
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default GenresInput