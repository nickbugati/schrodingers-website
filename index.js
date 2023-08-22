import React, { Component } from "react";

class HomePage extends Component {
    render() {
        return (
            <div style={styles.container}>
                <img src="/img/dogeggs.png" alt="Dog Eggs" style={styles.image} />
                <h4 style={styles.header}>Oops! You found Dog Eggs</h4>
                <p style={styles.paragraph}>Keep them a secret.</p>
            </div>
        );
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.5em'
    },
    image: {
        width: '700px',
        marginBottom: '20px'
    },
    header: {
        fontSize: '2em',
        marginBottom: '5px'  // reduced margin at the bottom of the header
    },
    paragraph: {
        fontSize: '1em',
        marginTop: '5px'  // reduced margin at the top of the paragraph
    }
};

export default HomePage;