import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useStore } from 'effector-react';

import style from './Menu.module.scss';

import {
	$resources,
	$allResourcesList,
	$currentType,
	setResourcesType,
	$currentResource,
	setResource,
	resetResource,
} from '../store';

const Menu = () => {
	const resources = useStore($resources);
	const allResourcesList = useStore($allResourcesList);
	const currentType = useStore($currentType);
	const currentResource = useStore($currentResource);
	const [list, setList] = useState([]);
	const [image, setImage] = useState(null);

	const onChoose = (type) => {
		setResourcesType(type);
	};

	useEffect(() => {
		if (resources) {
			setList(resources.find(({ type }) => type === currentType).items);
		}
	}, [currentType]);

	useEffect(() => {
		if (currentResource) {
			setImage(allResourcesList.find(({ id }) => id === currentResource).image);
		} else {
			setImage(null)
		}
	}, [currentResource]);

	return (
		<div className={style.menu}>
			<nav className={style.menu__nav}>
				<ul>
					{resources.map(({ type }) => (
						<li
							key={type}
							className={
								type === currentType
									? style['menu__nav-item_selected']
									: style['menu__nav-item']
							}
							onClick={() => onChoose(type)}
						>
							{type}
						</li>
					))}
				</ul>
			</nav>
			<ul className={style.menu__list}>
				{list.map(({ image, id }) => (
					<li key={id} onClick={() => setResource(id)}>
						<img src={image} />
					</li>
				))}
			</ul>
			<div>
				<div className={style.menu__current}>
					<img src={image} alt="" />
				</div>
				{image && <div className={style.menu__reset} onClick={resetResource}></div>}
			</div>
		</div>
	);
};

export default Menu;
