import { h } from 'preact';
import { useState, useEffect } from 'preact/compat';
import { useStore } from 'effector-react';

import style from './Board.module.scss';
import { $cube } from '../store';

const Board = () => {
	const [shiftIsPressed, setShift] = useState(false);
	const [rotateX, setRotateX] = useState(0);
	const [rotateY, setRotateY] = useState(0);
	const [currentLayer, setCurrentLayer] = useState(0);
	const cube = useStore($cube);

	const handleKeyPress = (e) => {
		console.log(e.code);

		if (e.code === 'ShiftLeft') {
			setShift(false);
		}

		const test = rotateY + '';
		if (e.code === 'ArrowLeft') setRotateY(+test + 90);
		if (e.code === 'ArrowRight') setRotateY(test - 90);

		if (!shiftIsPressed) {
			if (e.code === 'ArrowUp') setRotateX(rotateX + 90);
			if (e.code === 'ArrowDown') setRotateX(rotateX - 90);
		} else {
			if (e.code === 'ArrowTop') {
				if (currentLayer + 1 !== 4) {
					setCurrentLayer(currentLayer + 1);
				}
			}
			if (e.code === 'ArrowDown') {
				if (currentLayer - 1 !== -1) {
					setCurrentLayer(currentLayer - 1);
				}
			}
		}

		// left - ArrowLeft
		// right - ArrowRight
		// top - ArrowUp
		// bottom - ArrowDown
		// enter - Enter
	};
	const shiftHandler = (e) => {
		if (e.code === 'ShiftLeft') {
			setShift(true);
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', shiftHandler);
		document.addEventListener('keyup', handleKeyPress);

		// const test1 = 90;
		// const test2 = 180;
		// const test3 = 270;
		//
		// setTimeout(() => {
		// 	setRotateY(test1);
		// }, 1000);
		// setTimeout(() => {
		// 	setRotateY(test2);
		// }, 2000);
		// setTimeout(() => {
		// 	setRotateY(test3);
		// }, 3000);

		return () => {
			document.removeEventListener('keydown', shiftHandler);
			document.removeEventListener('keyup', handleKeyPress);
		};
	}, []);

	useEffect(() => {
		console.log('rotateX: ', rotateX);
	}, [rotateX]);

	return (
		<div className={style.board}>
			<div
				className={style.board__cube}
				style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}
			>
				<ul className={style.board__layers}>
					{cube.map((layer, i1) => (
						<li key={i1} className={style.board__layer}>
							<ul className={style.board__rows}>
								{layer.map((row, i2) => (
									<li key={i2} className={style.board__row}>
										<ul className={style.board__cells}>
											{row.map((cell, i3) => (
												<li key={i3} className={style.board__cell}>
													<div className={style['board__cell-side']}></div>
													<div className={style['board__cell-side']}></div>
													<div className={style['board__cell-side']}></div>
													<div className={style['board__cell-side']}></div>
													<div className={style['board__cell-side']}></div>
													<div className={style['board__cell-side']}></div>
												</li>
											))}
										</ul>
									</li>
								))}
							</ul>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Board;
