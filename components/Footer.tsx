import { Container } from '../UI/Container'
import { Divider } from '../UI/Divider'
import { Logo } from '../UI/Logo'
import Image from 'next/image'
import Link from 'next/link'
import { BsWhatsapp } from 'react-icons/bs'
import { FiFacebook } from 'react-icons/fi'
import { SlSocialGoogle } from 'react-icons/sl'

export const Footer = () => {
	return (
		// <div className="bg-[#003F62]">
		// 	<div className="max-w-[1440px] mx-auto px-14">
		// 		{/* <div className="rounded-3xl bg-white py-11 flex items-center px-24 justify-between my-10">
		// 			<p className="text-[#1B5A7D] font-bold text-3xl mr-32">
		// 				Subscribe newsletter
		// 			</p>
		// 			<div className="relative inline-block">
		// 				<input
		// 					placeholder="Email address"
		// 					className="pl-6 py-5 font-semibold text-sm bg-[#EDA415] rounded-2xl text-white placeholder:text-white pr-52"
		// 				/>
		// 				<div className="absolute right-0 top-[50%] -translate-y-[50%] pr-5">
		// 					<svg
		// 						width="25"
		// 						height="24"
		// 						viewBox="0 0 25 24"
		// 						fill="none"
		// 						xmlns="http://www.w3.org/2000/svg"
		// 					>
		// 						<path
		// 							d="M7.89999 6.31991L16.39 3.48991C20.2 2.21991 22.27 4.29991 21.01 8.10991L18.18 16.5999C16.28 22.3099 13.16 22.3099 11.26 16.5999L10.42 14.0799L7.89999 13.2399C2.18999 11.3399 2.18999 8.22991 7.89999 6.31991Z"
		// 							stroke="white"
		// 							strokeWidth="1.5"
		// 							strokeLinecap="round"
		// 							strokeLinejoin="round"
		// 						/>
		// 						<path
		// 							d="M10.61 13.6501L14.19 10.0601"
		// 							stroke="white"
		// 							strokeWidth="1.5"
		// 							strokeLinecap="round"
		// 							strokeLinejoin="round"
		// 						/>
		// 					</svg>
		// 				</div>
		// 			</div>
		// 			<div className="flex items-center">
		// 				<svg
		// 					xmlns="http://www.w3.org/2000/svg"
		// 					width="46"
		// 					height="45"
		// 					viewBox="0 0 46 45"
		// 					fill="none"
		// 				>
		// 					<path
		// 						d="M10.7375 34.6688V29.1937C10.7375 27.375 12.1625 25.7437 14.1875 25.7437C16.0063 25.7437 17.6375 27.1687 17.6375 29.1937V34.4625C17.6375 38.1187 14.6 41.1563 10.9438 41.1563C7.2875 41.1563 4.25 38.1 4.25 34.4625V22.9125C4.04375 12.375 12.3688 3.84375 22.9063 3.84375C33.4437 3.84375 41.75 12.375 41.75 22.7062V34.2563C41.75 37.9125 38.7125 40.95 35.0563 40.95C31.4 40.95 28.3625 37.9125 28.3625 34.2563V28.9875C28.3625 27.1687 29.7875 25.5375 31.8125 25.5375C33.6313 25.5375 35.2625 26.9625 35.2625 28.9875V34.6688"
		// 						stroke="#EDA415"
		// 						strokeWidth="2.5"
		// 						strokeLinecap="round"
		// 						strokeLinejoin="round"
		// 					/>
		// 				</svg>
		// 				<p className="max-w-[132px] text-sm font-semibold text-[#606060] ml-5">
		// 					Call us 24/7 : (+62) 0123 567 789
		// 				</p>
		// 			</div>
		// 		</div> */}

		// 		<div className="flex mb-10">
		// 			<div className="mr-[80px]">
		// 				<div className="mb-10">
		// 					<Logo />
		// 				</div>
		// 				<p className="max-w-[170px] text-[#1B5A7D] text-base mb-9">
		// 					64 st james boulevard hoswick , ze2 7zj
		// 				</p>
		// 				{/* <Divider /> */}
		// 				<div className="flex gap-9">
		// 					<SlSocialGoogle className="w-6 h-6" />
		// 					<FiFacebook className="w-6 h-6" />
		// 					<BsWhatsapp className="w-6 h-6" />
		// 				</div>
		// 			</div>

		// 			{/* <div className="flex w-full justify-around">
		// 				<div>
		// 					<h4 className="font-semibold text-xl text-[#1B5A7D] mb-3">
		// 						Find product
		// 					</h4>
		// 					<ul>
		// 						<li className="text-[#1B5A7D] text-xl mb-2">Brownze arnold</li>
		// 						<li className="text-[#1B5A7D] text-xl mb-2">
		// 							Chronograph blue
		// 						</li>
		// 						<li className="text-[#1B5A7D] text-xl mb-2">Smart phones</li>
		// 						<li className="text-[#1B5A7D] text-xl mb-2">Automatic watch</li>
		// 						<li className="text-[#1B5A7D] text-xl">Hair straighteners</li>
		// 					</ul>
		// 				</div>
		// 				<div>
		// 					<h4 className="font-semibold text-xl text-[#1B5A7D] mb-3">
		// 						Get help
		// 					</h4>
		// 					<ul>
		// 						<li className="text-[#1B5A7D] text-xl mb-2">About us</li>
		// 						<li className="text-[#1B5A7D] text-xl mb-2">Contact us</li>
		// 						<li className="text-[#1B5A7D] text-xl mb-2">Return policy</li>
		// 						<li className="text-[#1B5A7D] text-xl mb-2">Privacy policy</li>
		// 						<li className="text-[#1B5A7D] text-xl">Payment policy</li>
		// 					</ul>
		// 				</div>
		// 				<div>
		// 					<h4 className="font-semibold text-xl text-[#1B5A7D] mb-3">
		// 						About us
		// 					</h4>
		// 					<ul>
		// 						<li className="text-[#1B5A7D] text-xl mb-2">News</li>
		// 						<li className="text-[#1B5A7D] text-xl mb-2">Service</li>
		// 						<li className="text-[#1B5A7D] text-xl mb-2">Our policy</li>
		// 						<li className="text-[#1B5A7D] text-xl mb-2">Custmer care</li>
		// 						<li className="text-[#1B5A7D] text-xl">Faq’s</li>
		// 					</ul>
		// 				</div>
		// 			</div> */}
		// 		</div>
		// 	</div>
		// </div>

		<div className="bg-[#003F62] w-full">
			<Container>
				{/* <div className="flex mb-10"> */}
				<div className="flex justify-between text-white items-center mb-10 mt-10 gap-5 lg:gap-0 flex-col lg:flex-row">
					<Link href={'/'}>
						<Logo />
					</Link>
					<Link href={'https://goo.gl/maps/ATfNkd9yk4beV7vf6'} target="_blank">
						<p className="text-base text-center">
							Osiedle Sikorski Park 160, Wejherowo, Poland
						</p>
					</Link>
					<div className="flex gap-9">
						<Link href={'https://www.google.com/'} target="_blank">
							<SlSocialGoogle className="w-6 h-6" />
						</Link>
						<Link href={'https://facebook.com/'} target="_blank">
							<FiFacebook className="w-6 h-6" />
						</Link>
						<Link href={'https://www.whatsapp.com/'} target="_blank">
							<BsWhatsapp className="w-6 h-6" />
						</Link>
					</div>
				</div>
				{/* </div> */}
			</Container>
		</div>
	)
}
