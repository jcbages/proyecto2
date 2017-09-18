import React from 'react';
import FlipMove from 'react-flip-move';
import {shuffle} from 'lodash';
import './stylesheets/base.css';


import * as query from './getData';
import HeaderButtons from './HeaderButtons';
import RobotMaster from './RobotMaster';


class Clubs extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        removedRobotMasters: [],
        robotMasters: [],
        view: 'list',
        order: 'asc',
        sortingMethod: 'chronological',
        enterLeaveAnimation: 'accordianHorizontal',
        inProgress: false,
      };

      this.sortShuffle = this.sortShuffle.bind(this);
      this.toggleSort  = this.toggleSort.bind(this);
      this.toggleList  = this.toggleList.bind(this);
      this.refresh     = this.refresh.bind(this);
    }

    toggleSort() {
      const sortAsc  = (a, b) => parseInt(a.id, 10) - parseInt(b.id, 10);
      const sortDesc = (a, b) => parseInt(b.id, 10) - parseInt(a.id, 10);

      this.setState({
        order: (this.state.order === 'asc' ? 'desc' : 'asc'),
        sortingMethod: 'chronological',
        robotMasters: this.state.robotMasters.sort(this.state.order === 'asc' ? sortDesc : sortAsc),
      });
    }

    selectSeries(e) {
      //Need more elegant way than e.target.textContent
      if (this.state.selectedSeries === e.target.textContent) return;

      this.setState({
        selectedSeries: e.target.textContent,
      });
    }

    toggleList() {
      this.setState({
        view: 'list',
        enterLeaveAnimation: 'accordianVertical',
      });
    }

    refresh() {
      this.getData();
    }

    componentDidMount() {
      this.getData();
    }

    getData() {
      const url = `/clubs`;

      this.serverRequest = query.getData(url, (clubsData) => {
        this.setState({ robotMasters: clubsData });
      });
    }

    componentWillUnmount() {
    	if(!this.serverRequest&&this.serverRequest !== undefined){
      this.serverRequest.abort();
  }
    }

    componentDidUpdate(prevProps, prevState) {
      if (this.state.selectedSeries !== prevState.selectedSeries) {
        this.getData();
      }
    }

    moveRobotMaster(source, dest, index = 0) {
      if (this.state.inProgress) return;

      let sourceRobotMasters = this.state[source].slice();
      let destRobotMasters = this.state[dest].slice();

      if (!sourceRobotMasters.length) return;

      destRobotMasters = [].concat(sourceRobotMasters.splice(index, 1), destRobotMasters);

      this.setState({
        [source]: sourceRobotMasters,
        [dest]:   destRobotMasters,
        inProgress: true,
      });
    }

    renderRobotMasters() {
      const { robotMasters, view } = this.state;

      return robotMasters.map((robot, i) => {
        return (
          <RobotMaster
            key = {robot.id}
            view = {view}
            index= {i}
            clickHandler ={() => this.moveRobotMaster('robotMasters', 'removedRobotMasters', i)}
            {...robot}
          />
        );
      });
    }

    sortShuffle() {
      this.setState({
        sortingMethod: 'shuffle',
        robotMasters: shuffle(this.state.robotMasters),
      });
    }

    render() {
      const { view, order, sortingMethod, series } = this.state;
      return (
        <div id="shuffle" className={view}>
          <HeaderButtons
            view = {view}
            order = {order}
            sortingMethod = {sortingMethod}
            listClickHandler = {this.toggleList}
            gridClickHandler = {this.toggleGrid}
            sortClickHandler = {this.toggleSort}
            shuffleClickHandler = {this.sortShuffle}
            refreshClickHandlder = {this.refresh}
          />
          <div className="dropdown-spacer" style={{ height: 10 }} />
          <h1>Clubes de Lectura</h1>
          <ul>
            <FlipMove
              staggerDurationBy="30"
              duration={500}
              onFinishAll={() => {
                // TODO: Remove the setTimeout, when the bug is fixed.
                setTimeout(() => this.setState({ inProgress: false }), 1);
              }}>
              { this.renderRobotMasters() }
            </FlipMove>
          </ul>
        </div>
      );
    }
}

export default Clubs;