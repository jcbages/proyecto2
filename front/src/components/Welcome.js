import React from 'react'
import './Welcome.css';



/////////////////
/// COMPONENTS //
/////////////////

// Container
var Welcome = React.createClass({
    
    render: function() {
        
    
        
        return (
            <div>
                <Hero />
            </div>
        );
    }
});


//////////
// Hero //
//////////

var Hero = React.createClass({
    render: function() {
        return (
            <div id="hero" className="Hero" style={{backgroundImage: 'url(https://itbok.files.wordpress.com/2011/03/shutterstock_20850556_resize.jpg)'}}>
                <div className="content">
                    <h1> Tu Club de lectura virtual</h1>
                    <h2>Season 2 now available</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque id quam sapiente unde voluptatum alias vero debitis, magnam quis quod.</p>
                    <div className="button-wrapper">
                        <HeroButton primary={true} text="Watch now" />
                        <HeroButton primary={false} text="+ My list" />
                    </div>
                </div>
                <div className="overlay"></div>
            </div>
        );
    }
})

// Hero Button
var HeroButton = React.createClass({
    render: function() {
        return (
            <a href="#" className="Button" data-primary={this.props.primary}>{this.props.text}</a>
        );
    }
})




export default Welcome
