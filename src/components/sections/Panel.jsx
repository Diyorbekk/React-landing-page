import React from 'react';

function Panel({handleLogOut}) {
    return (
        <section className="border-bottom">
            <div className="container">
                <nav className="d-flex justify-content-between align-items-center py-3">
                    <div className="menu">
                        <button className="menu bg-transparent rounded">
                            <span className="icon-bar"><i className="ti-line-double"/></span>
                        </button>
                    </div>

                    <h2 className="mb-0">Admin Panel</h2>
                    <div className="dropdown">
                        <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown button
                        </button>
                        <div className="dropdown-menu border" aria-labelledby="dropdownMenuButton">
                            <button className="dropdown-item" onClick={handleLogOut}>Log out</button>
                        </div>
                    </div>
                </nav>
            </div>
        </section>
    );
}

export default Panel;