import { createDomain } from 'effector';

import dirt from './assets/dirt.jpg';
import stone from './assets/StoneTile.png';
import grass from './assets/grass.jpg';
import leaves from './assets/leaves.png';

const app = createDomain();

const setResourcesType = app.event();
const setResource = app.event();

const resources = [
	{
		type: 'grey',
		items: [
			{
				id: 1,
				image: dirt,
			},
			{
				id: 2,
				image: stone,
			},
		],
	},
	{
		type: 'green',
		items: [
			{
				id: 3,
				image: leaves,
			},
			{
				id: 4,
				image: grass,
			},
		],
	},
];

const $resources = app.store(resources);
console.log($resources.map);
const $allResourcesList = $resources.map((resourcesData) =>
	resourcesData.reduce(
		(array, currentObject) => [...array, ...currentObject.items],
		[],
	),
);

const $currentType = app.store('grey');
$currentType.on(setResourcesType, (_, type) => type);

const $currentResource = app.store(null);
$currentResource.on(setResource, (_, id) => id);

export {
	$resources,
	$allResourcesList,
	$currentType,
	setResourcesType,
	$currentResource,
	setResource,
};