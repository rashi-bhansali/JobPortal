import '../Styles/Home/Home.css';
import NavBar from './NavbarHome';
import React, { Component} from 'react';
import SearchComponent from './SearchComponent';
import Testimonial from './Testimonials';
import Stats from './Stats';
import Companies from './Companies';
import Footer from './HomeFooter';
import RecentJobs from './RecentJobs';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar></NavBar>
        <div className="HeroImage">
          <SearchComponent></SearchComponent>
        </div>
        <RecentJobs />
        <Stats/>
        <Companies />
        <Testimonial />
        <Footer/>
      </div>
    );
  }
}

export default App;
