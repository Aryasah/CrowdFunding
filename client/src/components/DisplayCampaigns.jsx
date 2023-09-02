import React from 'react';
import { useNavigate } from 'react-router-dom';

import FundCard from './FundCard';
import { loader } from '../assets';
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { ChevronRightIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'

const DisplayCampaigns = ({ title, isLoading, campaigns,isHomePage }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign })
  }
  
  return (
    <main>
       {isHomePage && <div className="pt-10 bg-gray-900 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
          <div className="mx-auto max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                <div className="lg:py-24">
                  <h1 className="mt-4 text-3xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-4xl lg:mt-6 xl:text-4xl">
                    <span className="block">Blockchain Crowdfunding:</span>
                    <span className="block text-indigo-400">Fueling Futures, Together</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg lg:text-base xl:text-lg">
                  Join us on a revolutionary journey where your support meets cutting-edge technology. Our blockchain-based crowdfunding platform ensures transparency, security, and global collaboration for turning dreams into reality.
                  </p>
                  <div className="mt-10 sm:mt-12">
                    
                  </div>
                </div>
              </div>
              <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                  {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                  <img
                    className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                    src="https://tailwindui.com/img/component-images/cloud-illustration-indigo-400.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>}

        {/* More main page content here... */}
        <div>
      <h1 className="font-epilogue font-semibold text-[18px] mt-[30px] text-white text-left">{title} ({campaigns.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard 
          key={campaign.id}
          {...campaign}
          handleClick={() => handleNavigate(campaign)}
        />)}
      </div>
    </div>
      </main>
  )
}

export default DisplayCampaigns