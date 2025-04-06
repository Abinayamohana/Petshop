import React from 'react'
//  Link
import {Link} from 'react-router-dom';

// Image
import golden from '../breed/golden.jpg';
import german from '../breed/german.jpg';
import labrador from '../breed/labrador.jpg';
import rottweiler from '../breed/rottweiler.jpg';
import beagle from '../breed/beagle.jpg';
import shihtzu from '../breed/shihtzu.jpg';
import boxer from '../breed/boxer.jpg';
import pug from '../breed/pug.jpg';
import husky from '../breed/husky.jpg';
import dober from '../breed/dober.jpg';
const breedCategory = [
  {  name : "Golden Retriever", image: golden, link: "/golden" },
  {  name : "German Shepherd", image: german, link: "/german" },
  {  name : "Labrador", image: labrador, link: "/labrador" },
  {  name : "Rottweiler", image: rottweiler, link: "/rottweiler" },
  {  name : "Beagle", image: beagle, link: "/beagle" },
  {  name : "Shih Tzu", image: shihtzu, link: "/shihtzu" },
  {  name : "Boxer", image: boxer, link: "/boxer" },
  {  name : "Pug", image: pug, link: "/pug" },
  {  name : "Husky", image: husky, link: "/husky" },
  {  name : "Doberman", image: dober, link: "/doberman" },
];

const ShopByBreed = () => {
  return (    
    <div className="breeds-container">
            {breedCategory.map((category, index) => (
              <Link
                to={category.link}
                key={index}
                className='breed-card'
                
              >
              <img src={category.image} alt={category.name} className="breed-image" />
                
              </Link>
            ))}
      </div>
   
  )
}

export default ShopByBreed