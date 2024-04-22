import './styles/App.css'
import { useState } from 'react'
import { FontContext } from './fontContext/FontContext'
import useChangeFont from './hooks/useChangeFont.ts'
import { WordDataNotFound, CuratedWordData } from './types/types'

import Header from './components/Header'
import SearchBar from './components/SearchBar'
import WordFound from './components/WordFound'
import WordNotFound from './components/WordNotFound'

function App() {
	const [selectedFont, setSelectedFont] = useChangeFont()
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const [wordDataResponse, setWordDataResponse] = useState<CuratedWordData | WordDataNotFound>()
	const wordNotFound = wordDataResponse && (wordDataResponse as WordDataNotFound).title // If the title exists, it means that the word was not found

	return (
		<FontContext.Provider value={{ selectedFont, setSelectedFont }}>
			<main>
				<Header setIsLoading={setIsLoading} setWordDataResponse={setWordDataResponse as React.Dispatch<React.SetStateAction<object | undefined>>} />
				<SearchBar isLoading={isLoading} setIsLoading={setIsLoading} setWordDataResponse={setWordDataResponse as React.Dispatch<React.SetStateAction<object | undefined>>} />
				{!wordNotFound ?
					(
						<WordFound wordDataResponse={wordDataResponse as CuratedWordData} setIsLoading={setIsLoading} setWordDataResponse={setWordDataResponse} />
					) :
					(
						<WordNotFound wordDataResponse={wordDataResponse as WordDataNotFound} />
					)
				}
			</main>
		</FontContext.Provider>
	)
}

export default App