import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import CollectionPage from "./collection.component";
import Spinner from "../../components/spinner/spinner.component";
import { useLocation } from "react-router-dom";

const GET_COLLECTION_BY_TITLE = gql`
	query getCollectionsByTitle($title: String!) {
		getCollectionsByTitle(title: $title) {
			id
			title
			items {
				id
				name
				price
				imageUrl
			}
		}
	}
`;

const CollectionPageContainer = () => {
	const location = useLocation();
	return (
		<Query query={GET_COLLECTION_BY_TITLE} variables={{ title: location.pathname.split("/")[2] }}>
      {({ loading, error, data }) => {
        if (loading) return <Spinner />;
        if (error) return `Error! ${error.message}`;
        return <CollectionPage collection={data.getCollectionsByTitle} />;
      }}
    </Query>
	);
};

export default CollectionPageContainer;