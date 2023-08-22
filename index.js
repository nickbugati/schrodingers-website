import React, { Component } from "react";

class HomePage extends Component {
    render() {
        return (
            <div style={{ padding: '100px', textAlign: 'center' }}>
                <img src="/dogeggs.png" alt="Dog Eggs" style={{ width: '200px', marginBottom: '20px' }} />
                <h4>Oops! You found Dog Eggs</h4>
                <p>Keep them a secret.</p>
                <a href="/" style={{ textDecoration: 'none', color: '#fff', backgroundColor: '#333', padding: '10px 20px', borderRadius: '5px' }}>
                    Go to Home
                </a>
            </div>
        );
    }
}

export default HomePage;