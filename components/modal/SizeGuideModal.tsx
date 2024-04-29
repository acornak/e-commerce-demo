import React, { FC, useState } from "react";
// Animations
import { motion, AnimatePresence } from "framer-motion";
// Types and constants
import { colors } from "@/lib/config/constants";
// Store
import { useModalsStore } from "@/lib/stores/modals-store";
// Icons
import CloseIcon from "../icon/Close";

const DressesTable = (): JSX.Element => {
	return (
		<>
			<h2 className="text-2xl font-bold py-4 uppercase tracking-widest text-lg">
				Dresses Size Chart
			</h2>
			<hr className="my-2 w-20 border-black" />
			<p className="tracking-wider text-gray-500">
				Dress Size Chart (Inch)
			</p>

			<div className="mt-6 w-full text-center py-3 border-x border-t border-gray-300 uppercase">
				<p className="font-semibold">Dresses</p>
				<p> Size in Inches</p>
			</div>
			<table className="table-auto w-full text-xs md:text-base">
				<thead>
					<tr className="text-center bg-gray-100 border border-gray-300 uppercase">
						<th className="py-4 font-normal border border-gray-300">
							Size
						</th>
						<th className="py-4 font-normal border border-gray-300">
							US / CAN
						</th>
						<th className="py-4 font-normal border border-gray-300">
							Bust
						</th>
						<th className="py-4 font-normal border border-gray-300">
							Waist
						</th>
						<th className="py-4 font-normal border border-gray-300">
							Hips
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className="text-center border border-gray-300">
						<td className="border border-gray-300 py-4">XS</td>
						<td className="border border-gray-300 py-4">0</td>
						<td className="border border-gray-300 py-4">
							31&quot;-32&quot;
						</td>
						<td className="border border-gray-300 py-4">
							24&quot;-25&quot;
						</td>
						<td className="border border-gray-300 py-4">
							34&quot;-35&quot;
						</td>
					</tr>
					<tr className="text-center bg-gray-50 border border-gray-300">
						<td className="border border-gray-300 py-4">S</td>
						<td className="border border-gray-300 py-4">2-4</td>
						<td className="border border-gray-300 py-4">
							33&quot;-34&quot;
						</td>
						<td className="border border-gray-300 py-4">
							26&quot;-27&quot;
						</td>
						<td className="border border-gray-300 py-4">
							36&quot;-37&quot;
						</td>
					</tr>
					<tr className="text-center border border-gray-300">
						<td className="border border-gray-300 py-4">M</td>
						<td className="border border-gray-300 py-4">6-8</td>
						<td className="border border-gray-300 py-4">
							35&quot;-36&quot;
						</td>
						<td className="border border-gray-300 py-4">
							28&quot;-29&quot;
						</td>
						<td className="border border-gray-300 py-4">
							38&quot;-39&quot;
						</td>
					</tr>
					<tr className="text-center bg-gray-50 border border-gray-300">
						<td className="border border-gray-300 py-4">L</td>
						<td className="border border-gray-300 py-4">10-12</td>
						<td className="border border-gray-300 py-4">
							37&quot;-39&quot;
						</td>
						<td className="border border-gray-300 py-4">
							30&quot;-32&quot;
						</td>
						<td className="border border-gray-300 py-4">
							40&quot;-42&quot;
						</td>
					</tr>
					<tr className="text-center border border-gray-300">
						<td className="border border-gray-300 py-4">XL</td>
						<td className="border border-gray-300 py-4">14</td>
						<td className="border border-gray-300 py-4">
							40&quot;-42&quot;
						</td>
						<td className="border border-gray-300 py-4">
							33&quot;-35&quot;
						</td>
						<td className="border border-gray-300 py-4">
							43&quot;-45&quot;
						</td>
					</tr>
				</tbody>
			</table>
			<p className="pt-6 tracking-wider text-gray-500">
				Dress Size Chart (cm)
			</p>
			<div className="mt-6 w-full text-center py-3 border-x border-t border-gray-300 uppercase">
				<p className="font-semibold">Dresses</p>
				<p> Size in cm</p>
			</div>
			<table className="table-auto w-full text-xs md:text-base">
				<thead>
					<tr className="text-center bg-gray-100 border border-gray-300 uppercase">
						<th className="py-4 font-normal border border-gray-300">
							Size
						</th>
						<th className="py-4 font-normal border border-gray-300">
							US / CAN
						</th>
						<th className="py-4 font-normal border border-gray-300">
							Bust
						</th>
						<th className="py-4 font-normal border border-gray-300">
							Waist
						</th>
						<th className="py-4 font-normal border border-gray-300">
							Hips
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className="text-center border border-gray-300">
						<td className="border border-gray-300 py-4">XS</td>
						<td className="border border-gray-300 py-4">0</td>
						<td className="border border-gray-300 py-4">
							78.7-81.2
						</td>
						<td className="border border-gray-300 py-4">
							60.9-63.5
						</td>
						<td className="border border-gray-300 py-4">
							86.3-88.9
						</td>
					</tr>
					<tr className="text-center bg-gray-50 border border-gray-300">
						<td className="border border-gray-300 py-4">S</td>
						<td className="border border-gray-300 py-4">2-4</td>
						<td className="border border-gray-300 py-4">
							83.8-86.3
						</td>
						<td className="border border-gray-300 py-4">66-68.5</td>
						<td className="border border-gray-300 py-4">
							91.4-93.9
						</td>
					</tr>
					<tr className="text-center border border-gray-300">
						<td className="border border-gray-300 py-4">M</td>
						<td className="border border-gray-300 py-4">6-8</td>
						<td className="border border-gray-300 py-4">
							88.9-91.4
						</td>
						<td className="border border-gray-300 py-4">
							71.1-73.6
						</td>
						<td className="border border-gray-300 py-4">96.5-99</td>
					</tr>
					<tr className="text-center bg-gray-50 border border-gray-300">
						<td className="border border-gray-300 py-4">L</td>
						<td className="border border-gray-300 py-4">10-12</td>
						<td className="border border-gray-300 py-4">93.9-99</td>
						<td className="border border-gray-300 py-4">
							76.2-81.2
						</td>
						<td className="border border-gray-300 py-4">
							101.6-106.6
						</td>
					</tr>
					<tr className="text-center border border-gray-300">
						<td className="border border-gray-300 py-4">XL</td>
						<td className="border border-gray-300 py-4">14</td>
						<td className="border border-gray-300 py-4">
							101.6-106.6
						</td>
						<td className="border border-gray-300 py-4">
							81.2-88.9
						</td>
						<td className="border border-gray-300 py-4">
							109.2-114.3
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
};

const SwimwearTable = (): JSX.Element => {
	return (
		<>
			<h2 className="text-2xl font-bold py-4 uppercase tracking-widest text-lg">
				Swimwear Size Chart
			</h2>
			<hr className="my-2 w-20 border-black" />
			<p className="tracking-wider text-gray-500">
				Swimwear Size Chart (Inch)
			</p>

			<div className="mt-6 w-full text-center py-3 border-x border-t border-gray-300 uppercase">
				<p className="font-semibold">Swimwear</p>
				<p> Size in Inches</p>
			</div>
			<table className="table-auto w-full text-xs md:text-base">
				<thead>
					<tr className="text-center bg-gray-100 border border-gray-300 uppercase">
						<th className="py-4 font-normal border border-gray-300">
							Size
						</th>
						<th className="py-4 font-normal border border-gray-300">
							US / CAN
						</th>
						<th className="py-4 font-normal border border-gray-300">
							Bust
						</th>
						<th className="py-4 font-normal border border-gray-300">
							Waist
						</th>
						<th className="py-4 font-normal border border-gray-300">
							Hips
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className="text-center border border-gray-300">
						<td className="border border-gray-300 py-4">XS</td>
						<td className="border border-gray-300 py-4">0</td>
						<td className="border border-gray-300 py-4">
							31&quot;-32&quot;
						</td>
						<td className="border border-gray-300 py-4">
							24&quot;-25&quot;
						</td>
						<td className="border border-gray-300 py-4">
							34&quot;-35&quot;
						</td>
					</tr>
					<tr className="text-center bg-gray-50 border border-gray-300">
						<td className="border border-gray-300 py-4">S</td>
						<td className="border border-gray-300 py-4">2-4</td>
						<td className="border border-gray-300 py-4">
							33&quot;-34&quot;
						</td>
						<td className="border border-gray-300 py-4">
							26&quot;-27&quot;
						</td>
						<td className="border border-gray-300 py-4">
							36&quot;-37&quot;
						</td>
					</tr>
					<tr className="text-center border border-gray-300">
						<td className="border border-gray-300 py-4">M</td>
						<td className="border border-gray-300 py-4">6-8</td>
						<td className="border border-gray-300 py-4">
							35&quot;-36&quot;
						</td>
						<td className="border border-gray-300 py-4">
							28&quot;-29&quot;
						</td>
						<td className="border border-gray-300 py-4">
							38&quot;-39&quot;
						</td>
					</tr>
					<tr className="text-center bg-gray-50 border border-gray-300">
						<td className="border border-gray-300 py-4">L</td>
						<td className="border border-gray-300 py-4">10-12</td>
						<td className="border border-gray-300 py-4">
							37&quot;-39&quot;
						</td>
						<td className="border border-gray-300 py-4">
							30&quot;-32&quot;
						</td>
						<td className="border border-gray-300 py-4">
							40&quot;-42&quot;
						</td>
					</tr>
					<tr className="text-center border border-gray-300">
						<td className="border border-gray-300 py-4">XL</td>
						<td className="border border-gray-300 py-4">14</td>
						<td className="border border-gray-300 py-4">
							40&quot;-42&quot;
						</td>
						<td className="border border-gray-300 py-4">
							33&quot;-35&quot;
						</td>
						<td className="border border-gray-300 py-4">
							43&quot;-45&quot;
						</td>
					</tr>
				</tbody>
			</table>
			<p className="pt-6 tracking-wider text-gray-500">
				Swimwear Size Chart (cm)
			</p>
			<div className="mt-6 w-full text-center py-3 border-x border-t border-gray-300 uppercase">
				<p className="font-semibold">Swimwear</p>
				<p> Size in cm</p>
			</div>
			<table className="table-auto w-full text-xs md:text-base">
				<thead>
					<tr className="text-center bg-gray-100 border border-gray-300 uppercase">
						<th className="py-4 font-normal border border-gray-300">
							Size
						</th>
						<th className="py-4 font-normal border border-gray-300">
							US / CAN
						</th>
						<th className="py-4 font-normal border border-gray-300">
							Bust
						</th>
						<th className="py-4 font-normal border border-gray-300">
							Waist
						</th>
						<th className="py-4 font-normal border border-gray-300">
							Hips
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className="text-center border border-gray-300">
						<td className="border border-gray-300 py-4">XS</td>
						<td className="border border-gray-300 py-4">0</td>
						<td className="border border-gray-300 py-4">
							78.7-81.2
						</td>
						<td className="border border-gray-300 py-4">
							60.9-63.5
						</td>
						<td className="border border-gray-300 py-4">
							86.3-88.9
						</td>
					</tr>
					<tr className="text-center bg-gray-50 border border-gray-300">
						<td className="border border-gray-300 py-4">S</td>
						<td className="border border-gray-300 py-4">2-4</td>
						<td className="border border-gray-300 py-4">
							83.8-86.3
						</td>
						<td className="border border-gray-300 py-4">66-68.5</td>
						<td className="border border-gray-300 py-4">
							91.4-93.9
						</td>
					</tr>
					<tr className="text-center border border-gray-300">
						<td className="border border-gray-300 py-4">M</td>
						<td className="border border-gray-300 py-4">6-8</td>
						<td className="border border-gray-300 py-4">
							88.9-91.4
						</td>
						<td className="border border-gray-300 py-4">
							71.1-73.6
						</td>
						<td className="border border-gray-300 py-4">96.5-99</td>
					</tr>
					<tr className="text-center bg-gray-50 border border-gray-300">
						<td className="border border-gray-300 py-4">L</td>
						<td className="border border-gray-300 py-4">10-12</td>
						<td className="border border-gray-300 py-4">93.9-99</td>
						<td className="border border-gray-300 py-4">
							76.2-81.2
						</td>
						<td className="border border-gray-300 py-4">
							101.6-106.6
						</td>
					</tr>
					<tr className="text-center border border-gray-300">
						<td className="border border-gray-300 py-4">XL</td>
						<td className="border border-gray-300 py-4">14</td>
						<td className="border border-gray-300 py-4">
							101.6-106.6
						</td>
						<td className="border border-gray-300 py-4">
							81.2-88.9
						</td>
						<td className="border border-gray-300 py-4">
							109.2-114.3
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
};

const ShoesTable = (): JSX.Element => {
	return (
		<>
			<h2 className="text-2xl font-bold py-4 uppercase tracking-widest text-lg">
				Shoes Size Chart
			</h2>
			<hr className="mt-2 mb-6 w-20 border-black" />
			<table className="table-auto w-full text-xs md:text-base">
				<thead>
					<tr className="text-center bg-gray-100 border border-gray-300 uppercase">
						<th className="py-4 font-normal border border-gray-300">
							US
						</th>
						<th className="py-4 font-normal border border-gray-300">
							Euro
						</th>
						<th className="py-4 font-normal border border-gray-300">
							UK
						</th>
						<th className="py-4 font-normal border border-gray-300">
							AUS
						</th>
						<th className="py-4 font-normal border border-gray-300">
							JAPAN
						</th>
						<th className="py-4 font-normal border border-gray-300">
							China
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className="text-center border border-gray-300">
						<td className="border border-gray-300 py-4">5</td>
						<td className="border border-gray-300 py-4">35-36</td>
						<td className="border border-gray-300 py-4">3</td>
						<td className="border border-gray-300 py-4">3.5</td>
						<td className="border border-gray-300 py-4">21.5</td>
						<td className="border border-gray-300 py-4">35</td>
					</tr>
					<tr className="text-center bg-gray-50 border border-gray-300">
						<td className="border border-gray-300 py-4">6</td>
						<td className="border border-gray-300 py-4">36-37</td>
						<td className="border border-gray-300 py-4">4</td>
						<td className="border border-gray-300 py-4">4.5</td>
						<td className="border border-gray-300 py-4">22.5</td>
						<td className="border border-gray-300 py-4">36</td>
					</tr>
					<tr className="text-center border border-gray-300">
						<td className="border border-gray-300 py-4">7</td>
						<td className="border border-gray-300 py-4">37-38</td>
						<td className="border border-gray-300 py-4">5</td>
						<td className="border border-gray-300 py-4">5.5</td>
						<td className="border border-gray-300 py-4">23.5</td>
						<td className="border border-gray-300 py-4">37</td>
					</tr>
					<tr className="text-center bg-gray-50 border border-gray-300">
						<td className="border border-gray-300 py-4">8</td>
						<td className="border border-gray-300 py-4">38-39</td>
						<td className="border border-gray-300 py-4">6</td>
						<td className="border border-gray-300 py-4">6.5</td>
						<td className="border border-gray-300 py-4">24.5</td>
						<td className="border border-gray-300 py-4">38</td>
					</tr>
					<tr className="text-center border border-gray-300">
						<td className="border border-gray-300 py-4">9</td>
						<td className="border border-gray-300 py-4">39-40</td>
						<td className="border border-gray-300 py-4">7</td>
						<td className="border border-gray-300 py-4">7.5</td>
						<td className="border border-gray-300 py-4">25.5</td>
						<td className="border border-gray-300 py-4">39</td>
					</tr>
					<tr className="text-center bg-gray-50 border border-gray-300">
						<td className="border border-gray-300 py-4">10</td>
						<td className="border border-gray-300 py-4">40-41</td>
						<td className="border border-gray-300 py-4">8</td>
						<td className="border border-gray-300 py-4">8.5</td>
						<td className="border border-gray-300 py-4">26.5</td>
						<td className="border border-gray-300 py-4">40</td>
					</tr>
					<tr className="text-center border border-gray-300">
						<td className="border border-gray-300 py-4">11</td>
						<td className="border border-gray-300 py-4">41-42</td>
						<td className="border border-gray-300 py-4">9</td>
						<td className="border border-gray-300 py-4">9.5</td>
						<td className="border border-gray-300 py-4">27.5</td>
						<td className="border border-gray-300 py-4">41</td>
					</tr>
				</tbody>
			</table>
		</>
	);
};

const SizeGuideModal: FC = () => {
	const [currentTab, setCurrentTab] = useState<
		"dresses" | "swimwear" | "shoes"
	>("dresses");
	const sizeGuideModalOpen = useModalsStore(
		(state) => state.sizeGuideModalOpen,
	);
	const setSizeGuideModalOpen = useModalsStore(
		(state) => state.setSizeGuideModalOpen,
	);

	const handleContent = () => {
		switch (currentTab) {
			case "dresses":
				return <DressesTable />;
			case "swimwear":
				return <SwimwearTable />;
			case "shoes":
				return <ShoesTable />;
			default:
				<></>;
		}

		return <></>;
	};

	return (
		<AnimatePresence>
			{sizeGuideModalOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					className="fixed inset-0 z-50 flex items-center justify-center"
					onClick={() => setSizeGuideModalOpen(false)}
				>
					<motion.div
						initial={{ scale: 0.9 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0.9 }}
						transition={{ duration: 0.3 }}
						className="relative bg-white px-6 md:px-20 py-6 w-[95%] md:w-3/4 text-black h-3/4 overflow-y-auto visible-scrollbar"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex">
							<button
								type="button"
								onClick={() => setCurrentTab("dresses")}
								className={`py-2 px-4 ${
									currentTab === "dresses"
										? "border-t border-x border-gray-300"
										: "border-b border-gray-300 hover:text-secondary hover:border-gray-200 hover:border-b-0 hover:border-t hover:border-x"
								}`}
							>
								Dresses
							</button>
							<button
								type="button"
								onClick={() => setCurrentTab("swimwear")}
								className={`py-2 px-4  ${
									currentTab === "swimwear"
										? "border-t border-x border-gray-300"
										: "border-b border-t-transparent border-gray-300 hover:text-secondary hover:border-gray-200 hover:border-b-0 hover:border-t hover:border-x"
								}`}
							>
								Swimwear
							</button>
							<button
								type="button"
								onClick={() => setCurrentTab("shoes")}
								className={`py-2 px-4 ${
									currentTab === "shoes"
										? "border-t border-x border-gray-300"
										: "border-b border-gray-300 hover:text-secondary hover:border-gray-200 hover:border-b-0 hover:border-t hover:border-x"
								}`}
							>
								Shoes
							</button>
							<div className="border-b border-gray-300 w-full" />
						</div>
						<motion.button
							initial={{ rotate: 0, color: colors.black }}
							whileHover={{
								rotate: 180,
								color: colors.secondary,
							}}
							whileTap={{
								rotate: 180,
								color: colors.secondary,
							}}
							transition={{ duration: 0.2 }}
							className="absolute top-0 right-0 mt-4 mr-4"
							onClick={() => setSizeGuideModalOpen(false)}
						>
							<CloseIcon />
						</motion.button>
						{handleContent()}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default SizeGuideModal;
