import React from 'react';
import './App.css';
import * as zl from  "./zlkit/index"
import { HomePage } from './demo/HomePage';

class App extends React.Component
{
    private router: zl.Router | undefined;
    render()
    {
        if (this.router === undefined) {
            this.router = new zl.Router();
            this.router.registHome(HomePage);
        }
        return this.router.reactElement();
    }
}

export default App;