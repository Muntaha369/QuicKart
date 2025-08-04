import ElecDealmd from '../../../public/ElecDealmd.png'
import ElecDealsm from '../../../public/Elecdealsm.png'
import { Julius_Sans_One } from 'next/font/google';

const JuliusSansOne = Julius_Sans_One({subsets:['latin'], weight:['400']})

const Ad = () => {
  return (
    <div className='ElecMain'>
    <div className='HeroDiv'>
      <div className='flex flex-col w-[50%] z-10'>
        <h1 className='SuperSonic'>Super Sonic</h1>
        <h1 className={` ${JuliusSansOne.className} Deals`}>DEALS</h1>
        <p className='HeroSub1'>Buy Electronics Gadgets</p>
        <p className='HeroSub2'>under 30 000</p>

        <div className="HeroButtonHolder">

          <button>
            <span>
              BUY NOW
            </span>  
          </button>

        </div>
      </div>

      <img 
      className='hidden md:flex'
      src={ElecDealmd.src} alt="Elecdeal" />

      <img
      className='z-0'
      src={ElecDealsm.src} alt="Elecdeal" />
    </div>
    </div>
  );
};

export default Ad