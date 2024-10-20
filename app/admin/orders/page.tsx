import React from "react";
// Next
import { NextPage } from "next";
// Components
import { StyledSectionHeading } from "@/components/styled/Heading";

const AdminOrdersPage: NextPage = (): JSX.Element => {
	return (
		<>
			<div className="text-center mt-6 pt-15">
				<StyledSectionHeading title="Order Management" />
			</div>
		</>
	);
};

export default AdminOrdersPage;
