import React from 'react';
import ReactDOMServer from 'react-dom/server';
import HomePage from './index.js';

export function renderHomePage() {
    return ReactDOMServer.renderToString(<HomePage />);
}