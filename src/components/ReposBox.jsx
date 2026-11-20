import { useState, useEffect } from 'react'





export default function ReposBox() {

    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sort, setSort] = useState("new");

    useEffect(() => {
        async function fetchRepos() {
            const response = await fetch("https://api.github.com/users/alridhaalqattan/repos")
            if (!response.ok) {
                throw new Error("Error fetching repositories");
            }
            return response.json();


        }
        fetchRepos()
            .then(data => {
                setRepos(data);
            })
            .catch(e => {
                setError(e.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [])

    const sortedRepos = [...repos].sort((a, b) => (
        sort === "new" ? new Date(b.created_at) - new Date(a.created_at) : new Date(a.created_at) - new Date(b.created_at)
    ))

    return (<>

        <label htmlFor="sort">Sort by:</label>
        <select style={{ marginLeft: '10px', border: '1px solid #ccc', width: '100px', alignSelf: "center" }} id="sort" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="new">Newest</option>
            <option value="old">Oldest</option>
        </select>

        {loading && <p>Loading my repositories...</p>}
        {error && <p>Error: {error}</p>}
        {sortedRepos.map(repo => (<>
            <p style={{ fontWeight: 'bold' }}>Title: {repo.name}</p>
            <p style={{ fontStyle: 'italic' }}>Main language: {repo.language}</p>
            <p style={{ color: 'green' }}>Created at: {repo.created_at}</p>
            <a href={repo.html_url} target="_blank">View repository</a>

        </>))}

    </>);
}