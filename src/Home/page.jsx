import React from 'react'
import Header from './header';
import Hero from './hero';
import About from './about';
import Product from './product';
import Footer from './footer';
import Testimonials from './teestimonials';
import Materials from './materials';
import Experiences from './experiences';

function Home() {
  return (
    <div className='poppins'>
      <Header/>
      <Hero/>
      <About/>
      <Product/>
      <Experiences/>
      <Materials/>
      <Testimonials/>
      <Footer/>
    </div>
  )
}

export default Home;