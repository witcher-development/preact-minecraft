import { h } from "preact";

import Menu from './components/Menu';
import Board from './components/Board';

export default () => {
  return <div id="app">
    <Menu />
    <Board />
  </div>;
};
