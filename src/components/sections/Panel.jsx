import React from 'react';

function Panel({handleLogOut}) {
    return (
        <section>
            <nav>
                <h2>Welcome</h2>
                <button onClick={handleLogOut}>Log out</button>
            </nav>
        </section>
    );
}

export default Panel;