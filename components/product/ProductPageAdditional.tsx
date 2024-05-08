import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

type ProductPageAdditionalProps = {
	imageUrl: string;
};

const ProductPageAdditional: FC<ProductPageAdditionalProps> = ({
	imageUrl,
}): JSX.Element => {
	return (
		<div className="flex px-4 items-center justify-center">
			<div className="w-full xl:w-2/3 flex flex-wrap md:flex-nowrap">
				<div className="w-full md:w-2/3">
					<h1 className="text-xs uppercase tracking-widest text-gray-500 pt-4">
						More information for you
					</h1>
					<h1 className="pt-2 text-xl font-medium tracking-wider">
						Things you might want to know
					</h1>
					<hr className="border-b-2 mt-2 border-secondary w-24" />
					<div className="flex flex-wrap md:flex-nowrap">
						<div className="pt-6 text-sm text-gray-600 w-full md:w-1/2 mr-4 text-justify">
							<p>
								We use industry standard SSL encryption to
								protect your details. Potentially sensitive
								information such as your name, address and card
								details are encoded so they can only be read on
								the secure server.
							</p>
							<p className="pt-4 pb-2 font-medium">
								Safe Payments
							</p>
							<p className="py-2 font-medium">
								Credit Cards Accepted
							</p>
							<p className="py-2 font-medium">
								Different Payment Methods
							</p>
							<p className="py-2 font-medium">
								rices Include VAT
							</p>
							<p className="py-2 font-medium">Easy To Order</p>
						</div>
						<div className="w-full md:w-1/2 md:ml-4">
							<h1 className="font-medium py-2">
								Express Delivery
							</h1>
							<p className="pb-1 text-gray-600">
								Europe & USA within 2-4 days
							</p>
							<p className="py-1 text-gray-600">
								Rest of the world within 3-4 days
							</p>
							<p className="py-1 text-gray-600">
								Selected locations
							</p>
							<h1 className="font-medium py-2">
								Need More Information?
							</h1>

							<p className="pb-1">
								<Link
									className="text-gray-600 hover:text-secondary"
									href="/faq"
								>
									Orders & Shipping
								</Link>
							</p>
							<p className="py-1">
								<Link
									className="text-gray-600 hover:text-secondary"
									href="/faq"
								>
									Returns & Refunds
								</Link>
							</p>
							<p className="py-1">
								<Link
									className="text-gray-600 hover:text-secondary"
									href="/faq"
								>
									Payments
								</Link>
							</p>
							<p className="py-1">
								<Link
									className="text-gray-600 hover:text-secondary"
									href="/orders"
								>
									Your Orders
								</Link>
							</p>
						</div>
					</div>
				</div>
				<div className="w-1/3 hidden md:flex">
					<Image
						src={imageUrl}
						alt={imageUrl}
						width={600}
						height={600}
						style={{
							objectFit: "cover",
						}}
						priority
					/>
				</div>
			</div>
		</div>
	);
};

export default ProductPageAdditional;
