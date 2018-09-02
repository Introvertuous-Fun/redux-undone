import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTodos } from 'redux/modules/todos/selectors';
import { attemptSwapTodo } from 'redux/modules/todos/actions';
import AddTodo from './AddTodo';
import Todo from './Todo';
import Draggable from 'draggable';

class Todos extends Component {
  onDrag = (mutation = [0, 0]) => {
    const [src, dst] = mutation;
    this.props.attemptSwapTodo(src, dst);
  };

  render() {
    const { entries } = this.props;
    return (
      <div className="panel">
        <AddTodo />
        <Draggable.Group
          disableRootEvents
          as="ol"
          className="todos"
          onChange={this.onDrag}
        >
          {entries.map(({ value, done }) => (
            <Draggable.Target key={value} as="li">
              {({ eventHandlers, targetActive }) => (
                <Todo
                  active={targetActive}
                  value={value}
                  done={done}
                  key={value}
                  onMouseDown={eventHandlers.onPanStart}
                />
              )}
            </Draggable.Target>
          ))}
        </Draggable.Group>
      </div>
    );
  }
}

export default connect(
  state => ({
    entries: getTodos(state),
  }),
  { attemptSwapTodo }
)(Todos);
