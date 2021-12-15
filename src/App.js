import './App.css'
import { useEffect, useState } from 'react'
import 'react-github-cards/dist/medium.css'
import { getMostStarredRepository, getLargestRepository, getLastPushedRepository, getTotalStars } from './api'
import RepositoryCard from './components/RepositoryCard'
import StarIcon from './components/StarIcon'

function App() {
    const [mostStarredRepository, setMostStarredRepository] = useState(undefined)
    const [largestRepository, setLargestRepository] = useState(undefined)
    const [lastPushedRepository, setLastPushedRepository] = useState(undefined)

    const [totalStars, setTotalStars] = useState(undefined)

    const [userData, setUserData] = useState(undefined)
    const [isLoading, setLoading] = useState(true); 
    
    

    useEffect(() => {
        const fetchData = async () => {
            const repository = (await getMostStarredRepository()).response
            setMostStarredRepository(repository)

            setLargestRepository((await getLargestRepository()).response)
            setLastPushedRepository((await getLastPushedRepository()).response)
            setTotalStars((await getTotalStars()).response)

            setUserData(repository.owner)

            setLoading(false)
        }

        fetchData()
    }, [setMostStarredRepository])

    const prettyTimestamp = (s) => `${s.split('T')[0]} ${s.split('T')[1].replace('Z', '')}`

    const redirectToGithubProfile = () => {
        window.location.href = 'https://github.com/ivanhrabcak'
    }

    if (isLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div>
            <div onClick={redirectToGithubProfile} className="user-info">
                <img className="user-icon" src={userData.avatar_url} alt="Avatar URL" /><br/>
                <username>{ userData.login }</username>
                <totalstars>Stars: { totalStars }<StarIcon /></totalstars>
            </div>
            
            
            <repositories>
                <content>
                    <h2>Repository with most stars:</h2>
                    <RepositoryCard repositoryData={mostStarredRepository} />
                    <h2>Largest (MB) repository:</h2>
                    <RepositoryCard repositoryData={largestRepository} />
                    <h2>Last pushed repository: ({ prettyTimestamp(lastPushedRepository.pushed_at) })</h2>
                    <RepositoryCard repositoryData={lastPushedRepository} />
                </content>
            </repositories>

            <footer>
                <content>
                    <forkme>Find this site's source code on <a href="https://github.com/ivanhrabcak/ivan.hrabcak.eu">Github</a></forkme>
                    <forkbackend>The backend's source code (for the statistics) on <a href="https://github.com/ivanhrabcak/portfolio-backend">Github</a></forkbackend>
                </content>
            </footer>
        </div>
    )
}

export default App
