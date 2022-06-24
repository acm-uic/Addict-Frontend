export default function Page404(): JSX.Element {
    // Return a medium bootstrap container with a heading of "Unauthenticated"
    return (
        <div className="container-sm">
                    <h1>Testing UI</h1><br/>
                    <h2>Page 404</h2>
                    <input type="text" placeholder="Username:"/>
                    <div className="button">Login</div>
                    <div className="button-secondary">Add User</div>
        </div>
    );
}
