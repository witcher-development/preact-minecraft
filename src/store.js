import { createDomain } from 'effector';

import dirt from './assets/dirt.jpg';
import stone from './assets/StoneTile.png';
import grass from './assets/grass.jpg';
import leaves from './assets/leaves.png';

const app = createDomain();

const setResourcesType = app.event();
const setResource = app.event();
const resetResource = app.event();
const setCell = app.event();
const resetCube = app.event();

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

const row = [...Array(3)].map(() => ({ value: null }));
const layer = [row, row, row];
const cube = [layer, layer, layer];

const $resources = app.store(resources);
const $allResourcesList = $resources.map((resourcesData) =>
	resourcesData.reduce(
		(array, currentObject) => [...array, ...currentObject.items],
		[],
	),
);

const $currentType = app.store('grey');
$currentType.on(setResourcesType, (_, type) => type);

const $currentResource = app.store(null);
$currentResource.on(setResource, (_, id) => id).reset(resetResource);

const $cube = app.store(cube);
$cube.on(setCell, (cube, { z, y, x }) => {
	const resource = $allResourcesList
		.getState()
		.find(({ id }) => id === $currentResource.getState());

	const newCube = JSON.parse(JSON.stringify(cube));

	newCube[z][y][x].value = resource ? resource.image : null;
	return newCube;
}).reset(resetCube);

export {
	$resources,
	$allResourcesList,
	$currentType,
	setResourcesType,
	$currentResource,
	setResource,
	resetResource,
	$cube,
	setCell,
	resetCube,
};
