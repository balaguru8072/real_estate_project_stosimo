import React from 'react'
import ContactBanner from '../../_component/_contact/_contact_banner/ContactBanner'
import ContactInfoSection from '../../_component/_contact/_contactUs/ContactInfoSection';
import ContactSection from '../../_component/_contact/_contactUs/ContactSection';

async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return true;
}

export default async function Page() {
  await getData();
  return (
    <div>
        <ContactBanner />
        <ContactInfoSection />
        <ContactSection />
    </div>
  )
}

