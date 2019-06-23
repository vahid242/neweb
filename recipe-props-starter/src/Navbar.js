import React, {Component} from 'react';
import './Navbar.css';

class Navbar extends Component {
    render(){
        return(
                <header>
                    <h2>Recipe App</h2>
                    <nav>
                        <li>New Recipe</li>
                        <li>Home</li>
                        <li>About</li>
                        <li>Contact Us</li>
                    </nav>
                </header>
            )
    }
}

export default Navbar;