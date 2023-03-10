import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { default as CollectionsOverview } from '../../components/collections-overview/collections-overview.container';
import { default as CollectionPage } from '../collection/collection.container';

const ShopPage = () => {

	return (
		<div className="shop-page">
			<Routes>

				<Route path={`/:collectionId`}
				       element={<CollectionPage/>}
				/>

				<Route path="/"
				       element={<CollectionsOverview/>}
				/>

			</Routes>
		</div>
	)
};

export default ShopPage;
