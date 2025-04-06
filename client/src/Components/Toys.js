import React from 'react'
import { Link } from "react-router-dom";

// StyleSheet
import '../Css/myStyles.css';

// Image
import heading from '../toy/heading.jpg';

import chew from '../toy/chew.jpg';
import interactive from '../toy/interactive.jpg'
import rope from '../toy/rope.jpg'
import plush from '../toy/plush.jpg'


const toyCategory = [
  {  image: chew, link: "/dogchew" },
  {  image: interactive, link: "/interactive" },
  {  image: rope, link: "/rope" },
  {  image: plush, link: "/plush" },
  
];

const Toys = () => {
  return (
    <>
      <img src={heading} className='cover' />
      <h1 className='m-4 font-bold'>Shop for Dogs</h1>
      <div className="d-flex flex-wrap justify-content-around overflow-auto px-3 gap-4">
      {toyCategory.map((category, index) => (
        <Link
          to={category.link}
          key={index}
          className='w-48 shadow-lg rounded-lg overflow-hidden text-center '
          
        >
          <img src={category.image} alt={category.name} className="food" />
          
        </Link>
      ))}
    </div>
      
      <h1 className='dog-head mt-4'>Dog Toys</h1>
      <Link to="/Dogtoys"><p className='dog-head'>View all</p></Link>
    
      
    </>
  )
}

export default Toys
