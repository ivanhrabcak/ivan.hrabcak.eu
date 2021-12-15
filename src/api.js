const BACKEND_URL = `http://localhost:8080`;

const url = (path) => `${BACKEND_URL}${path}`

const getMostStarredRepository = async () => {
    const response = await fetch(url('/repositories/sorted/0'))
    
    const mostStarredRepository = await response.json()
    return mostStarredRepository
}

const getLargestRepository = async () => {
    const response = await fetch(url('/repositories/size/0'))

    const largestRepository = await response.json();
    return largestRepository;
}

const getLastPushedRepository = async () => {
    const response = await fetch(url('/repositories/last_pushed/0'))

    const lastPushedRepository = await response.json();
    return lastPushedRepository
}

const getTotalStars = async () => {
    const response = await fetch(url('/stars'))

    return await response.json()
}

export { getMostStarredRepository, getLargestRepository, getLastPushedRepository, getTotalStars }