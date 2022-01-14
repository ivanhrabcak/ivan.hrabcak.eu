import './App.css'
import { useEffect, useState } from 'react'
import 'react-github-cards/dist/medium.css'
import { getMostStarredRepository, getLargestRepository, getLastPushedRepository, getTotalStars, getUserData } from './api'
import RepositoryCard from './components/RepositoryCard'
import StarIcon from './components/StarIcon'

function App() {
    const [mostStarredRepository, setMostStarredRepository] = useState(undefined)
    const [largestRepository, setLargestRepository] = useState(undefined)
    const [lastPushedRepository, setLastPushedRepository] = useState(undefined)

    const [totalStars, setTotalStars] = useState(undefined);
    const [userData, setUserData] = useState(undefined)

    const [isLoading, setLoading] = useState(true); 
    

    useEffect(() => {
        const fetchData = async () => {
            const repository = (await getMostStarredRepository()).response
            setMostStarredRepository(repository)

            setLargestRepository((await getLargestRepository()).response)
            setLastPushedRepository((await getLastPushedRepository()).response)
            setTotalStars((await getTotalStars()).response)

            setUserData((await getUserData()).response)

            setLoading(false)
        }

        fetchData()
    }, [setMostStarredRepository])

    const prettyTimestamp = (s) => `${s.split('T')[0]}`

    const getYearsOld = () => {
        return Math.abs(new Date(new Date(2005, 3, 25) - new Date()).getFullYear() - 1970 + 1)
    }

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
            <div className="user-info">
                <header>
                    <img onClick={redirectToGithubProfile} className="pointer user-icon" src={userData.avatar_url} alt="Avatar URL" /><br/>
                    <username className="pointer" onClick={redirectToGithubProfile}>{userData.login}</username>
                </header>
                <totalstars className="user-info-item pointer" onClick={redirectToGithubProfile}>Stars: { totalStars }<StarIcon /></totalstars>
                <totalrepositories className="user-info-item pointer" onClick={redirectToGithubProfile}>Total repositories: {userData.repository_count}</totalrepositories>
                <email className="user-info-item">E-mail: {userData.email}</email>
                <followers className="user-info-item pointer" onClick={redirectToGithubProfile}>Github followers: {userData.followers}</followers>
                <age className="user-info-item pointer">Years of age: {getYearsOld()}</age>
            </div>
            
            
            <repositories>
                <content>
                    <stattitle>Repository with most stars:</stattitle>
                    <RepositoryCard repositoryData={mostStarredRepository} />
                    <stattitle>Largest ({Math.round(largestRepository.size / 1024)}MB) repository:</stattitle>
                    <RepositoryCard repositoryData={largestRepository} />
                    <stattitle>Last pushed repository: ({ prettyTimestamp(lastPushedRepository.pushed_at) })</stattitle>
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
