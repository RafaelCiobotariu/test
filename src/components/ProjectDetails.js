import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch';

const ProjectDetails = () => {
    const { id } = useParams();
    const { data, error, isLoading } = useFetch('http://localhost:8000/projects/' + id);
    const [title, setTitle] = useState('')
    const [link, setLink] = useState('')
    const [images, setImages] = useState('')
    const [visible, setVisible] = useState(true)
    const navigate = useNavigate();

    console.log(data)
    const project = { title, link, images, visible };

    const handleDelete = () => {
        fetch('http://localhost:8000/projects/' + data.id, {
            method: 'DELETE'
        })
            .then(() => {
                navigate('/');
            })
    }

    const handleEdit = (e) => {
        fetch('http://localhost:8000/projects/' + data.id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
            .then(() => {
                console.log('new project updated')
                // setIsPending(false)
            })

        window.location.reload();
    }


    const convertToBase64 = async (e) => {
        const file = await e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setImages(reader.result.toString());
        }

        reader.readAsDataURL(file)
    }

    const handleCancel = () => {
        setTitle(data.title);
        setLink(data.link);
        setImages(data.images);
        setVisible(data.visible);
    }


    return (
        <div className="project-details">
            {isLoading && <div className='loading-data'>Loading data...</div>}
            {error && <div>{error}</div>}
            {data && (
                <article className='details-data'>
                    <div className='details-left-part'>
                        <h2>{data.title}</h2>
                        <Link to={data.link} className="link-to-site-button-edit-page" target="_blank">Link to {data.title} </Link>
                        <img src={data.images} className="edit-page-photo" />
                        <p>{data.visible}</p>
                    </div>
                    <div className='details-right-part'>
                        <form onSubmit={handleEdit}>
                            <label>Project title</label>
                            <input
                                type="text"
                                placeholder={data.title}
                                defaultValue={data.title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <label>Project URL</label>
                            <input
                                type="text"
                                placeholder={data.link}
                                defaultValue={data.link}
                                onChange={(e) => setLink(e.target.value)}
                            />
                            <label>Project Images</label>
                            <input
                                type="file"
                                accept='image/*'
                                required
                                placeholder='Images'
                                // defaultValue={data.images}
                                onChange={(e) => convertToBase64(e)}
                            />
                            <label>Project visibility</label>
                            <select
                                value={visible}
                                // defaultValue={data.visible}
                                onChange={(e) => setVisible(e.target.value)}
                            >
                                <option value={true}>Visible</option>
                                <option value={false}>Not visible</option>
                            </select>
                        </form>
                    </div>
                </article>
            )}
            <div className='buttons-edit'>
                <button className='delete-button' onClick={handleDelete}>Delete</button>
                <button className='save-changes-button' onClick={handleEdit}>Save changes</button>
                <button className='cancel-changes-button' onClick={handleCancel}>Cancel changes</button>
                <Link to="/" className='back-button'>Back to portofolio</Link>
            </div>
        </div>
    );
}

export default ProjectDetails;