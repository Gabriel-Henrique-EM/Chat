export default ({users}: {users: string[]}) => {
    return (
        <div>
            <h2>Usuários Conectados:</h2>
            <ul>
                {users.map((user) => (
                    <li key={user}>{user}</li>
                ))}
            </ul>
        </div>
    )
}