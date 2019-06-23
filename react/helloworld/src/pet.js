import React, {Component} from 'react';
import HobbyList from './hobbiesList';
import './pet.css';


 		class Pet extends Component {
 			render(){
 			return(
 				<div className="card">
 					<h2 className="name">maxi</h2>
 					<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbviSJcx2a4U01BRinV9aTIrdxUBzy9ZCHs2WdNG49aanJilZG"
 						alt="My cat" />
 						<h5 style={{fontSize:'2em', margin:'2px'}}>Hobbies:</h5>
                        <HobbyList />
 				</div>);
 			}
 		}
 export default Pet;