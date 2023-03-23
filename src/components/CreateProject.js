import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CreateProject = () => {
    const [title, setTitle] = useState('')
    const [link, setLink] = useState('')
    const [images, setImages] = useState("")
    const [visible, setVisibility] = useState(true)
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const project = { title, link, images, visible };
        setIsPending(true);

        fetch('http://localhost:8000/projects/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
            .then(() => {
                console.log('new project added')
                setIsPending(false)
            })
    }

    const convertToBase64 = async (e) => {
        const file = await e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setImages(reader.result.toString());
        }

        reader.readAsDataURL(file)
    }


    return (
        <div className='add-new-form'>
            <h2>Add a new project</h2>
            <form onSubmit={handleSubmit}>
                <label>Project title</label>
                <input
                    type="text"
                    required
                    placeholder='Project title'
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Project URL</label>
                <input
                    type="text"
                    required
                    placeholder='Project url'
                    onChange={(e) => setLink(e.target.value)}
                />
                <label>Project Images</label>
                <input
                    type="file"
                    accept='image/*'
                    required
                    placeholder='Images'
                    onChange={(e) => convertToBase64(e)}
                />
                <label>Project visibility</label>
                <select
                    value={visible}
                    onChange={(e) => setVisibility(e.target.value)}
                >
                    <option value={true}>Visible</option>
                    <option value={false}>Not visible</option>
                </select>

                {!isPending && <button>Add project</button>}
                {!isPending && <Link to="/" className='back-button'>Back to portofolio</Link>}
                {isPending && <button disabled>Adding project...</button>}
            </form>
        </div>
    )
}

export default CreateProject