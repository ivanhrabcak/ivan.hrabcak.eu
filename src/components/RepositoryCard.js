import StarIcon from "./StarIcon";

const RepositoryCard = ({ repositoryData }) => {
    const language = repositoryData.language.toLowerCase();


    const tryAlternativeIcon = (e) => {
        e.target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${language}/${language}-plain.svg`
    }

    return (
        <div className="repository-card" onClick={() => { window.location.href = repositoryData.html_url}}>
            <content>
                <name>{ repositoryData.name }</name>
                
                <description>{ repositoryData.description ? repositoryData.description : 'No description' }</description>

                <repostats>
                    <stars>
                        Stars: { repositoryData.stargazers_count }
                        <StarIcon />
                    </stars>

                    <language>
                        <langname>Language:</langname>
                        { repositoryData.language ? <img 
                                                        onError={tryAlternativeIcon} 
                                                        alt={language} title={language} 
                                                        className="language-icon" 
                                                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${language}/${language}-original.svg`} /> 
                                                    : <div>Unknown Lanugage</div> }
                    </language>
                </repostats>
            </content>
        </div>
    )
}

export default RepositoryCard