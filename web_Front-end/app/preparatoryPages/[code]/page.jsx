import React from 'react'
import Preparatory from '../../_component/_preparatoryPages/_listing_prepartory/Prepartory'
import LatestNews from '../../_component/_homePages/LatestNews';
import ContactSection from '../../_component/_contact/_contactUs/ContactSection';


function page() {
  return (
    <div className='mt-[100px] md:mt-[65px]'>
        <Preparatory />
        <LatestNews />
        <ContactSection />
    </div>
  )
}

export default page