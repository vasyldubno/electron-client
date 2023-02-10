import Image from 'next/image'

export const Benefits = () => {
	const listBenefits = [
		{
			image:
				'https://res.cloudinary.com/dtkchspyx/image/upload/v1673356276/shop_electron/icon-free-delivery_ab8y6s.svg',
			title: 'Free delivery',
		},
		{
			image:
				'https://res.cloudinary.com/dtkchspyx/image/upload/v1673356276/shop_electron/icon-best-quality_vtwv7n.svg',
			title: 'Best quality',
		},
		{
			image:
				'https://res.cloudinary.com/dtkchspyx/image/upload/v1673356276/shop_electron/icon-warranty_iofvxu.svg',
			title: '1 year warranty',
		},
	]
	return (
		<div className="bg-[#E2F4FF] rounded-[20px] xl:px-28 flex justify-between py-11 mb-24 lg:px-10 px-5 gap-3 flex-col sm:flex-row  sm:items-start">
			{listBenefits.map((benefit, index) => (
				<div className="flex items-center gap-3" key={index}>
					<div className="w-[64px] h-[64px] relative">
						<Image
							src={benefit.image}
							alt="free_delivery"
							fill
							className="object-contain"
						/>
					</div>
					<p className="text-[#003F62] font-semibold text-xl mb-2 md:w-28">
						{benefit.title}
					</p>
				</div>
			))}
		</div>
	)
}
