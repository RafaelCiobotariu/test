import { Link } from 'react-router-dom'

const CardList = ({ projects }) => {
    return (
        projects.map(project => {
            if (project.visible) {
                return (
                    <div key={project.id} className="project-card">
                        <h3>{project.title}</h3>
                        <img src={project.images} className="card-photo" />
                        <Link to={project.link} className="link-to-site-button" target="_blank">See site</Link>
                        <Link to={`/projects/${project.id}`} className="edit-button links"> See details</Link>
                    </div>
                )
            } else {
                return null
            }
        })
    )
}

export default CardList