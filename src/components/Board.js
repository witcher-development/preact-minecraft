import { h } from 'preact';
import { useState, useEffect } from 'preact/compat';
import { useStore } from 'effector-react';

import style from './Board.module.scss';
import { $cube, setCell } from '../store';

const Board = () => {
	const [shiftIsPressed, setShift] = useState(false);
	const [rotateX, setRotateX] = useState(0);
	const [rotateY, setRotateY] = useState(0);
	const [currentLayer, setCurrentLayer] = useState(0);
	const cube = useStore($cube);

	const handleKeyPress = (e) => {
		if (e.code === 'ShiftLeft') {
			setShift(false);
		}

		if (e.code === 'ArrowLeft') setRotateY(rotateY + 90);
		if (e.code === 'ArrowRight') setRotateY(rotateY - 90);

		if (!shiftIsPressed) {
			if (e.code === 'ArrowUp') setRotateX(rotateX + 90);
			if (e.code === 'ArrowDown') setRotateX(rotateX - 90);
		} else {
			if (e.code === 'ArrowUp') {
				if (currentLayer + 1 !== 3) {
					setCurrentLayer(currentLayer + 1);
				}
			}
			if (e.code === 'ArrowDown') {
				if (currentLayer - 1 !== -1) {
					setCurrentLayer(currentLayer - 1);
				}
			}
		}
	};
	const shiftHandler = (e) => {
		if (e.code === 'ShiftLeft') {
			setShift(true);
		}
	};
	const chooseCell = (z, y, x) => {
		setCell({ z, y, x });
	};

	useEffect(() => {
		document.addEventListener('keydown', shiftHandler);
		document.addEventListener('keyup', handleKeyPress);

		return () => {
			document.removeEventListener('keydown', shiftHandler);
			document.removeEventListener('keyup', handleKeyPress);
		};
	}, [rotateX, rotateY, shiftIsPressed, currentLayer]);

	useEffect(() => {
		console.log('test');
	}, [cube]);

	return (
		<div className={style.board}>
			<div className={style.board__controls}>
				<div
					className={style.board__left}
					onClick={() => setRotateY(rotateY - 90)}
				></div>
				<div
					className={style.board__right}
					onClick={() => setRotateY(rotateY + 90)}
				></div>
				<div
					className={style.board__top}
					onClick={() => setRotateX(rotateX + 90)}
				></div>
				<div
					className={style.board__down}
					onClick={() => setRotateX(rotateX - 90)}
				></div>
			</div>
			<div
				className={style.board__cube}
				style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}
			>
				<ul className={style.board__layers}>
					{cube.map((layer, i1) => (
						<li
							key={i1}
							className={
								currentLayer > i1
									? style.board__layer_hidden
									: style.board__layer
							}
						>
							<span>{i1}</span>
							<ul className={style.board__rows}>
								{layer.map((row, i2) => (
									<li key={i2} className={style.board__row}>
										<ul className={style.board__cells}>
											{row.map((cell, i3) => (
												<li
													key={i3}
													className={style.board__cell}
													onClick={() => chooseCell(i1, i2, i3)}
												>
													{[...Array(6)].map(() => (
														<div
															className={style['board__cell-side']}
															style={{ backgroundImage: `url(${cell.value})` }}
														></div>
													))}
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
